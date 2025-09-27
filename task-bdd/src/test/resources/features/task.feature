Feature: Add a Task

  Scenario: Add a valid task
    Given I have a task with title "Complete project report" and due date "2025-10-01"
    When I add the task
    Then the task should be created successfully

  Scenario: Add a task with past due date
    Given I have a task with title "Submit assignment" and due date "2020-01-01"
    When I add the task
    Then the task creation should fail with message "Due date cannot be in the past"

  Scenario: Add a task with empty title
    Given I have a task with title "" and due date "2025-11-01"
    When I add the task
    Then the task creation should fail with message "Title cannot be empty"
