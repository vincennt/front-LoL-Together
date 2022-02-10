import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import backgroundImage from '../images/signup-background.png'
import styled from 'styled-components'
import { motion } from "framer-motion"

import Nav from '../components/Nav'
import Logo from '../components/Logo'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Button from '../components/Button'

import { UserContext } from '../contexts/UserContext'

const Header = styled.div`
  height: 115vh;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0) 70%), url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
  padding-left: 10%;
  padding-top: 10%;
  padding-bottom: 10%;
`
const SideDiv = styled.div`
  width: 30%;
  font-size: 20px;
  .p2 {
    font-size: 15px;
  }
`
const ErrorForm = styled.div`
  color: red;
  font-weight: bold;
  display: block;
`
const FooterDiv = styled.div`
  padding: 200px;
`

const Signup = () => {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState([])
  const { setUser } = useContext(UserContext)
  const [errorSignup, setErrorSignup] = useState(null)

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      summoner_name: ""
    },
    onSubmit: values => {
      signup(values)
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Nom requis"),
      email: Yup.string()
        .required("Email requis")
        .email("Format invalide"),
      password: Yup.string()
        .required("Mot de passe requis")
        .min(8, "Mot de passe trop court"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Le mot de passe doit être identique'),
      summoner_name: Yup.string()
        .required("Nom d'invocateur requis"),
    })
  })
  
  const signup = async values => {
    // fetch signup
    const signupResponse = await fetch('http://localhost:5000/auth/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
        summoner_name: values.summoner_name
      })
    })

    const user = await signupResponse.json()

    if (user.error) {
      setErrorSignup(user.error)
      return
    }

    // fetch login
    const loginResponse = await fetch('http://localhost:5000/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: user.username,
        password: values.password
      })
    })

    if (loginResponse.status >= 400) {
      alert(loginResponse.statusText)
    } else {
      const data = await loginResponse.json()
      setUser(data)
      navigate('/')
    }
  }

  // console.log(formik.values)
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header>
          <SideDiv>
            <motion.div
              style={{ x: -100 }} 
              animate={{ x: 0 }} 
            >
              <Logo />
              <Title text="Inscription" size='72'/>
              <ErrorForm>
                {errorSignup && errorSignup}
              </ErrorForm>
              <form onSubmit={formik.handleSubmit} className='formulaire'>
                <div className="mb-3">
                  <label className="form-label">Nom d'utilisateur</label>
                  <input 
                    type="text" 
                    className="form-control shadow" 
                    id="username"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                  />
                  <ErrorForm>
                    {formik.errors.username}
                  </ErrorForm>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control shadow" 
                    placeholder="Email"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                  />
                  <ErrorForm>
                    {formik.errors.email}
                  </ErrorForm>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input 
                    type="password" 
                    className="form-control shadow" 
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                  />
                  <ErrorForm>
                    {formik.errors.password}
                  </ErrorForm>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmer mot de passe</label>
                  <input 
                    type="password" 
                    className="form-control shadow" 
                    placeholder="Confirmer votre mot de passe"
                    name='passwordConfirmation'
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    error={formik.errors.passwordConfirmation}
                  />
                  <ErrorForm>
                    {formik.errors.passwordConfirmation}
                  </ErrorForm>
                </div>
                <div className="mb-5">
                  <label className="form-label">Nom d'invocateur</label>
                  <input 
                    type="text" 
                    className="form-control shadow" 
                    placeholder="Nom d'invocateur"
                    name="summoner_name"
                    value={formik.values.summoner_name}
                    onChange={formik.handleChange}
                    error={formik.errors.summoner_name}
                  />
                  <ErrorForm>
                    {formik.errors.summoner_name}
                  </ErrorForm>
                </div>
                <div className='text-center'>
                  <Button text="S'inscrire" />
                </div>
              </form>
            </motion.div>
          </SideDiv>
        </Header>
      </motion.div>
      <Footer>
        <FooterDiv/>
      </Footer>
    </>
  )
}

export default Signup