import React, { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import backgroundImage from '../images/signup-background.png'
import blur from '../images/blur.png'
import styled from 'styled-components'

import Nav from '../components/Nav'
import Logo from '../components/Logo'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Button from '../components/Button'

const Header = styled.div`
  background-image: url(${backgroundImage});
  height: 115vh;
  background-repeat: no-repeat;
  background-size: cover;
  positive: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const Separator = styled.div`
  background-image: url(${blur});
  background-repeat: no-repeat;
  background-size: cover;
  height: 160px;
`
const SideDiv = styled.div`
  left: 10%;
  top: 20%;
  position: absolute;
  font-size: 20px;
  width: 30%;
  .p2 {
    font-size: 15px;
  }
`
const ErrorForm = styled.div`
  color: red;
  font-weight: bold;
  display: block;
`

const Signup = () => {
  const [errorSignup, setErrorSignup] = useState(null)

  const formik = useFormik({
    initialValues: {
      username: "Test",
      email: "Test@test.com",
      password: "test",
      passwordConfirmation: "test",
      summoner_name: "test"
    },
    onSubmit: values => {
      signup(values)
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password is too short"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      summoner_name: Yup.string()
        .required("Nom d'summoner_name is required"),
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
        password: user.password
      })
    })

    if (loginResponse.status >= 400) {
      alert(loginResponse.statusText)
    } else {
      const data = await loginResponse.json()
      // setUser(data)
      console.log(data)
      // navigate('/home')
    }
  }

  // console.log(formik.values)
  return (
    <>
      <Nav />
      <Header>
      <SideDiv>
          <Logo />
          <Title text="Inscription" size='72'/>
          <ErrorForm>
             {errorSignup && errorSignup}
          </ErrorForm>
          <form onSubmit={formik.handleSubmit}>
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
        </SideDiv>
        <Separator />
      </Header>
      <Footer />
    </>
  )
}

export default Signup