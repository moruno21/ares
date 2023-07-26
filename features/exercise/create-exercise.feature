@exercises
@application
Feature: Create exercise

Scenario: Creating an exercise
    Given the exercise list currently looks as follows:
    | name        |  description             |
    | Bench Press |  Bench Press description |
    When I create the following exercise:
    | name        |  description       |
    | Squat       |  Squat description |
    Then I should see the following exercise list:
    | name        |  description             |
    | Bench Press |  Bench Press description |
    | Squat       |  Squat description       |

Scenario: Creating an exercise with invalid params
    When I create the following exercise:
    | name | description |
    |      | Description |
    Then I should see the following error:
    | name                | code  |
    | InvalidExerciseName | blank |

Scenario: Creating an exercise whose name is already used by another exercise
    Given the exercise list currently looks as follows:
    | name        |  description             |
    | Bench Press |  Bench Press description |
    When I create the following exercise:
    | name        |  description        |
    | Bench Press |  Random description |
    Then I should see the following error:
    | name               | code      |
    | NotCreatedExercise | name_already_in_use |
