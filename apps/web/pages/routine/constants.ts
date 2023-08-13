import * as Yup from 'yup'

export const initialValues = {
  description: '',
  name: '',
  workouts: [],
}

export const validationSchema = Yup.object().shape({
  description: Yup.string().max(250, 'Too long description'),
  name: Yup.string().required('Name cannot be empty').max(50, 'Too long name'),
  workouts: Yup.array().of(
    Yup.object().shape({
      exerciseName: Yup.string().min(4, 'too short').required('Required'),
      reps: Yup.number().min(1).required('Required'),
      sets: Yup.number().min(1).required('Required'),
    }),
  ),
})
