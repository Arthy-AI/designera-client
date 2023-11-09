import {configureStore, createSlice} from '@reduxjs/toolkit';
import {SimpleButton} from '../button/SimpleButton';
import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {FormikError} from '../input/FormikError';
import axios from 'axios';
import toast from 'react-hot-toast';
import {NetworkConfig} from '../../hooks/useAxios';

interface ObjMap {
  [key: string]: any;
}

const changeNameValidation = Yup.object().shape({
  firstName: Yup.string()
    .max(32, 'Maximum length: 32.')
    .min(2, 'Minimum length: 2.')
    .matches(/^[a-zA-ZçıöğüşÇİÖĞÜŞ ]*$/, {message: 'Please use only letters.'})
    .required('Please enter a valid name.'),

  lastName: Yup.string()
    .max(32, 'Maximum length: 32.')
    .min(2, 'Minimum length: 2.')
    .matches(/^[a-zA-ZçıöğüşÇİÖĞÜŞ ]*$/, {message: 'Please use only letters.'})
    .required('Please enter a valid surname.'),
});

const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .max(256, 'Maximum length: 256.')
    .min(8, 'Minimum length: 8.')
    .matches(/^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d).{8,}$/u, {
      message: `Your password must include a uppercase character, a lowercase character, and a number.`,
    })
    .required('Please enter a valid password.'),
  newPassword: Yup.string()
    .max(256, 'Maximum length: 256.')
    .min(8, 'Minimum length: 8.')
    .matches(/^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d).{8,}$/u, {
      message: `Your password must include a uppercase character, a lowercase character, and a number.`,
    })
    .required('Please enter a valid password.'),

  confirmPassword: Yup.string()
    .max(256, 'Maximum length: 256')
    .min(8, 'Minimum length: 8.')
    .required('Please enter a valid password.')
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match.'),
});

const menus = {
  'Account Settings': {
    'Change Name':
      <div className="flex flex-col">
        <Formik
          initialValues={{firstName: '', lastName: ''}}
          validationSchema={changeNameValidation}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            const token = localStorage.getItem('token');

            axios.patch(NetworkConfig.API_URL + 'user/me', {
              firstName: values.firstName,
              lastName: values.lastName,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then(() => {
              location.reload()
            });
          }}
        >
          {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit}>
              <div className={`cursor-pointer border-white text-stone-300 font-thin p-4 pt-0`}>
                <input placeholder={'First Name'} id={'firstName'} name={'firstName'} onChange={handleChange}
                       onBlur={handleBlur}
                       className={'Font-Medium bg-transparent outline-0 placeholder-normal'}/>
              </div>
              {touched.firstName && <FormikError touched={touched.firstName} error={errors.firstName}/>}
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`cursor-pointer border-white text-stone-300 font-thin p-4`}>
                <input placeholder={'Last Name'} id={'lastName'} name={'lastName'} onChange={handleChange}
                       onBlur={handleBlur}
                       className={'Font-Medium bg-transparent outline-0 placeholder-normal'}/>
              </div>
              {touched.lastName && <FormikError touched={touched.lastName} error={errors.lastName}/>}
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`flex flex-row justify-around items-center p-4`}>
                <button type={'submit'} className={'font-semibold text-white cursor-pointer'}>Change Name</button>
              </div>
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`flex flex-row justify-center items-center p-4`} onClick={() => {
                goBack();
              }}>
                <span className={'font-semibold text-white cursor-pointer'}>Cancel</span>
              </div>
            </form>
          )}
        </Formik>
        <hr className={'bg-stone-400 border-none h-px'}/>
      </div>,
    'Change Password':
      <div className="flex flex-col">
        <Formik
          initialValues={{oldPassword: '', newPassword: '', confirmPassword: ''}}
          validationSchema={changePasswordValidation}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            const token = localStorage.getItem('token');

            axios.patch(NetworkConfig.API_URL + 'auth/update-password', {
              ...values,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((res) => {
              toast.success("Password changed successfully!");
            }).catch((err) => {
              toast.error(err.response.data.message);
            });
          }}
        >
          {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit}>
              <div className={`cursor-pointer border-white text-stone-300 font-thin p-4 pt-0`}>
                <input placeholder={'Current Password'} id={'oldPassword'} name={'oldPassword'}
                       onChange={handleChange} onBlur={handleBlur}
                       className={'Font-Medium bg-transparent outline-0 placeholder-normal'}/>
              </div>
              {touched.oldPassword &&
                  <FormikError touched={touched.oldPassword} error={errors.oldPassword}/>}
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`cursor-pointer border-white text-stone-300 font-thin p-4`}>
                <input
                  id={'newPassword'} name={'newPassword'} onChange={handleChange} onBlur={handleBlur}
                  placeholder={'New Password'}
                  className={'Font-Medium bg-transparent outline-0 placeholder-normal'}

                />
              </div>
              {touched.newPassword && <FormikError touched={touched.newPassword} error={errors.newPassword}/>}
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`cursor-pointer border-white text-stone-300 font-thin p-4`}>
                <input
                  id={'confirmPassword'} name={'confirmPassword'} onChange={handleChange} onBlur={handleBlur}
                  placeholder={'Confirm New Password'}
                  className={'Font-Medium bg-transparent outline-0 placeholder-normal'}/>
              </div>
              {touched.confirmPassword &&
                  <FormikError touched={touched.confirmPassword} error={errors.confirmPassword}/>}
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`flex flex-row justify-around items-center p-4`}>
                <button type={'submit'} className={'font-semibold text-white cursor-pointer'}>Change Password</button>
              </div>
              <hr className={'bg-stone-400 border-none h-px'}/>
              <div className={`flex flex-row justify-center items-center p-4`} onClick={() => {
                goBack();
              }}>
                <span className={'font-semibold text-white cursor-pointer'}>Cancel</span>
              </div>
            </form>
          )}
        </Formik>
        <hr className={'bg-stone-400 border-none h-px'}/>
      </div>,
    "Logout": () => {
      localStorage.removeItem(`token`)
      localStorage.removeItem(`keepMeSignedIn`)
      location.reload()
    }
    /*"Delete Account":
        <div className="flex flex-col">
        <span
            className={"block text-center text-white cursor-pointer p-4 pt-0"}>We are sorry to say goodbye!<br/>See you next time...</span>
            <hr className={"bg-stone-400 border-none h-px"}/>
            <div className={`cursor-pointer border-white text-stone-300 font-thin p-4`}>
                <input placeholder={"Confirm Password"}
                       className={"bg-transparent outline-0 placeholder-normal"}/>
            </div>
            <hr className={"bg-stone-400 border-none h-px"}/>
            <div className={`flex flex-row justify-around items-center p-4`}>
                <span className={"font-semibold text-white cursor-pointer"}>Continue</span>
                <span className={"font-semibold text-white cursor-pointer"} onClick={() => {
                    goBack()
                }}>Cancel</span>
            </div>
            <hr className={"bg-stone-400 border-none h-px"}/>
        </div>*/
  },
  'Manage Plan': () => {
  },
  /*'Delete Images':
    <div className="flex flex-col">
                <span
                  className={'Font-Light block text-center text-white p-4 pt-0'}>Do you agree to delete images?</span>
      <hr className={'bg-stone-400 border-none h-px'}/>
      <div className={`flex flex-row justify-around items-center p-4`}>
        <button className={'font-semibold text-white cursor-pointer'} onClick={() => {

        }}>Yes</button>
        <span className={'font-semibold text-white cursor-pointer'} onClick={() => {
          goBack();
        }}>No</span>
      </div>
      <hr className={'bg-stone-400 border-none h-px'}/>
    </div>,*/
};

async function goBack() {
  settingsStore.dispatch(settingsSlice.actions.menuGoBack());
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    currentMenu: (menus as ObjMap),
    previousMenu: {},
    currentTitle: 'Settings',
    previousTitle: '',
  },
  reducers: {
    menuGoBack: state => {
      let tempMenu = state;
      state.currentMenu = {...tempMenu.previousMenu};
      state.previousMenu = {...tempMenu.currentMenu};
      state.currentTitle = tempMenu.previousTitle;
      state.previousTitle = tempMenu.currentTitle;
    },
    changeMenu: (state, action) => {
      let tempMenu = state;
      tempMenu.previousMenu = {...tempMenu.currentMenu};
      tempMenu.currentMenu = tempMenu.currentMenu[action.payload['v']];
      tempMenu.previousTitle = tempMenu.currentTitle;
      tempMenu.currentTitle = action.payload['v'];
      state = {...tempMenu};
    },
    reset: state => {
      let tempMenu = state;
      tempMenu.currentMenu = (menus as ObjMap);
      tempMenu.previousMenu = {};
      tempMenu.currentTitle = 'Settings';
      tempMenu.previousTitle = '';
      state = {...tempMenu};
    },
    triggerFunction: (state, action) => {
      let menu = action.payload['v'];

      switch (menu) {
        case "Logout":
          localStorage.removeItem(`token`)
          localStorage.removeItem(`keepMeSignedIn`)
          location.reload()
          break;
        case "Manage Plan":
          const response = axios.get(NetworkConfig.API_URL + 'network-health').then((data) => {
            if (data.status == 200) {
              window.open("https://billing.stripe.com/p/login/4gw3eg3Dlg1T78QfYY", "_blank");
            } else {
              toast.error("An error occurred.")
            }
          })
            .catch((err) => {})
          break;
      }
    }
  },
});

const settingsStore = configureStore({
  reducer: settingsSlice.reducer,
});

export {settingsStore, settingsSlice};
