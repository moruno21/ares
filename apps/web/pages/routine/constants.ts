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
      reps: Yup.number()
        .required('Required')
        .min(1, 'Reps must be higher than 0')
        .max(100, 'Reps must be lower than 100'),
      sets: Yup.number()
        .required('Required')
        .min(1, 'Sets must be higher than 0')
        .max(100, 'Sets must be lower than 100'),
    }),
  ),
})
