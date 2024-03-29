import Button from '@ares/ui/components/Button'
import IconButton from '@ares/ui/components/IconButton'
import { Body1, H4 } from '@ares/ui/components/Text'
import { ErrorMessage, Field as FormikField } from 'formik'

import { CustomErrorMessage, DeleteIcon, EditIcon, Label } from '../styles'
import useWorkout from './hooks'
import {
  Buttons,
  Container,
  Content,
  Dropdown,
  Field,
  Form,
  Info,
  InputUnit,
  WorkoutSettings,
} from './styles'
import { WorkoutProps } from './types'

const Workout = ({
  exerciseId,
  exerciseName,
  handleDeleteWorkout,
  index,
  reps,
  sets,
}: WorkoutProps) => {
  const {
    dropdownOptions,
    exercise,
    handleBlurInput,
    handleExerciseChange,
    handleOpenEditWorkout,
    handleSaveWorkout,
    initialValues,
    isEditWorkoutOpen,
    isUserOwnRoutine,
    t,
  } = useWorkout({ exerciseId, index })

  return (
    <Container>
      {isEditWorkoutOpen ? (
        <Form>
          <Field>
            <Label htmlFor={`workouts_[${index}]_sets`}>
              {t('workout.form.inputs.exercise.label')}
            </Label>
            <Dropdown
              noResultsMessage={t('workout.form.inputs.exercise.no_result')}
              onChange={handleExerciseChange}
              options={dropdownOptions}
              placeholder={t('workout.form.inputs.exercise.placeholder')}
              value={exercise}
            />
          </Field>
          <Field>
            <Label htmlFor={`workouts_[${index}]_sets`}>
              {t('workout.form.inputs.sets.label')}
            </Label>
            <FormikField
              as={InputUnit}
              id={`workouts_[${index}]_sets`}
              data-initialvalue={initialValues.workouts[index].sets}
              max={100}
              min={1}
              name={`workouts[${index}].sets`}
              onBlur={handleBlurInput}
              placeholder={t('workout.form.inputs.sets.placeholder')}
              type="number"
            />
          </Field>
          <ErrorMessage name={`workouts[${index}].sets`}>
            {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
          </ErrorMessage>
          <Field>
            <Label htmlFor={`workouts_[${index}]_.reps`}>
              {t('workout.form.inputs.reps.label')}
            </Label>
            <FormikField
              as={InputUnit}
              data-initialvalue={initialValues.workouts[index].reps}
              id={`workouts_[${index}]_.reps`}
              max={100}
              min={1}
              name={`workouts[${index}].reps`}
              onBlur={handleBlurInput}
              placeholder={t('workout.form.inputs.reps.placeholder')}
              type="number"
            />
          </Field>
          <ErrorMessage name={`workouts[${index}].reps`}>
            {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
          </ErrorMessage>
          <Button onClick={handleSaveWorkout} type="submit">
            {t('workout.form.save.label')}
          </Button>
        </Form>
      ) : (
        <Content>
          <Info>
            <Field>
              <H4>{t('workout.exercise_name.label')}</H4>
              <Body1>{exerciseName}</Body1>
            </Field>
            <WorkoutSettings>
              <Field>
                <H4>{t('workout.sets.label')}</H4>
                <Body1>{sets}</Body1>
              </Field>
              <Field>
                <H4>{t('workout.reps.label')}</H4>
                <Body1>{reps}</Body1>
              </Field>
            </WorkoutSettings>
          </Info>
          {isUserOwnRoutine ? (
            <Buttons>
              <IconButton onClick={handleOpenEditWorkout}>
                <EditIcon />
              </IconButton>
              <IconButton
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => handleDeleteWorkout(index)}
                type="submit"
              >
                <DeleteIcon />
              </IconButton>
            </Buttons>
          ) : null}
        </Content>
      )}
    </Container>
  )
}

export default Workout
