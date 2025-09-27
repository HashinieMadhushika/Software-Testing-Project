package com.taskmanager.stepdefinitions;
import com.taskmanager.model.Task;
import io.cucumber.java.en.*;
import org.junit.Assert;
import java.time.LocalDate;

public class TaskStepDefinitions {

    private String title;
    private LocalDate dueDate;
    private Task task;
    private Exception exception;

    @Given("I have a task with title {string} and due date {string}")
    public void i_have_a_task_with_title_and_due_date(String title, String dueDate) {
        this.title = title;
        this.dueDate = (dueDate == null || dueDate.isEmpty()) ? null : LocalDate.parse(dueDate);
    }
    @When("I add the task")
    public void i_add_the_task() {
        try {
            task = new Task(title, dueDate);
        } catch (Exception e) {
            exception = e;
        }
    }
    @Then("the task should be created successfully")
    public void the_task_should_be_created_successfully() {
        Assert.assertNotNull("Task should be created", task);
        Assert.assertEquals(title, task.getTitle());
        Assert.assertEquals(dueDate, task.getDueDate());
    }
    @Then("the task creation should fail with message {string}")
    public void the_task_creation_should_fail_with_message(String expectedMessage) {
        Assert.assertNotNull("Exception should be thrown", exception);
        Assert.assertEquals(expectedMessage, exception.getMessage());
    }
}
