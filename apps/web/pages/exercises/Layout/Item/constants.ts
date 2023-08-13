import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  description: Yup.string().max(250, 'Too long description'),
  name: Yup.string().required('Name cannot be empty').max(50, 'Too long name'),
})
