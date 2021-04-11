import { useState } from 'react';
import emailjs from 'emailjs-com';
import { useAlert } from 'react-alert'

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const alert = useAlert();

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    emailjs.sendForm('service_mxhqxdh', 'template_cewjyrp', event.target, 'user_rcwcXjztMV0VSfd5Qgk6x')
        .then((result) => {
            alert.show('Confirmation mail sent',
            { timeout: 2000, // custom timeout just for this one alert
              type: 'success',
            }) 
        }, (error) => {
            console.log(error.text);
        });
    callback();
  };

  const onSubmitl = (event) => {
     event.preventDefault();
      callback();
  };

  return {
    onChange,
    onSubmit,
    onSubmitl,
    values
  };
};