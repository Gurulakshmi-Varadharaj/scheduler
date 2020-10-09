import React from "react";

import { render, cleanup, waitForElement, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import { fireEvent } from "@testing-library/react/dist";

import { getByText, queryByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "Lydia Miller-Jones" } })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    const confirm = getAllByTestId(container, "confirm")[0];

    fireEvent.click(getByText(confirm, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    // 3. Click the "Edit" button on the appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Enter the new student name "Lydia Miller-Jones" into the input and select new interviewer.
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "Lydia Miller-Jones" } })

    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 6. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 7. Check that the DayListItem with the text "Monday" has not changed.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //Mocking a Mock to mock some error message
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "Lydia Miller-Jones" } })

    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => getAllByTestId(appointment, "Error"))

    expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    const confirm = getAllByTestId(container, "confirm")[0];

    fireEvent.click(getByText(confirm, "Confirm"));

    await waitForElement(() => getAllByTestId(appointment, "Error"))

    expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
    //debug(confirm);
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

    /***const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();***/
  });
});