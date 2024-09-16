//
//  UserForm.test.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {describe, expect, it} from "vitest";
import {act} from "react";
import {ApplicationConstants} from "../../../src/js/ApplicationConstants.js";
import {User} from "../../../src/js/model/valueObject/User.js";
import {Department} from "../../../src/js/model/valueObject/Department.js";
import {UserForm} from "../../../src/js/view/components/UserForm.jsx";

describe("UserForm", () => {

    it("should render the UserForm", () => {
        render(<UserForm />);
        expect(screen.getByText(/User Form/i)).toBeInTheDocument();
    });

    it("should test mounted event", () => {
        return new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, resolve, {once: true});
            render(<UserForm />);
        });
    });

    it("should test unmounted event", () => {
        return new Promise(resolve => {
             window.addEventListener(ApplicationConstants.USER_FORM_UNMOUNTED, resolve, {once: true});
             const {unmount} = render(<UserForm />);
             unmount();
        });
    });

    it("should test setDepartments", () => {
        return new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;

                act(() => {
                    component.setDepartments([new Department(1, "Accounting"), new Department(2, "Sales")]);
                });

                await waitFor(() => {
                    const options = screen.getAllByRole("option");
                    expect(options).toHaveLength(2);
                    expect(options[0]).toHaveTextContent("Accounting");
                    expect(options[1]).toHaveTextContent("Sales");
                });

                resolve();
            }, {once: true})
            render(<UserForm />);
        });
    });

    it("should test setUser", () => {
        return new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;
                const departments = [new Department(1, "Accounting"), new Department(2, "Sales")];
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com",
                    "ijk456", new Department(1, "Accounting"), []);

                act(() => {
                    component.setDepartments(departments);
                    component.setUser(larry);
                });

                await waitFor(() => {
                    const options = screen.getAllByRole("option");
                    expect(options).toHaveLength(2);
                    expect(screen.getByLabelText("First Name:").value).toBe(larry.first);
                    expect(screen.getByLabelText("Last Name:").value).toBe(larry.last);
                    expect(screen.getByLabelText("Email:").value).toBe(larry.email);
                    expect(screen.getByLabelText("Username:").value).toBe(larry.username);
                    expect(screen.getByLabelText("Password:").value).toBe(larry.password);
                    expect(screen.getByLabelText("Confirm:").value).toBe(larry.password);
                    expect(parseInt(screen.getByRole("combobox").value)).toBe(departments[0].id);
                });

                resolve();
            }, {once: true});

            render(<UserForm />);
        });
    });

    it("should test update user", () => {
        return new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;
                const departments = [new Department(1, "Accounting"), new Department(2, "Sales")];
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com",
                    "ijk456", new Department(1, "Accounting"), []);

                act(() => {
                    component.setDepartments(departments);
                    component.setUser(larry);
                });

                await waitFor(async () => {
                    expect(screen.getAllByRole("option")).toHaveLength(2);
                    fireEvent.change(screen.getByLabelText("Username:"), {target: {value: "lstooge1"}});
                });

                window.addEventListener(component.UPDATE, (event) => {
                    expect(event.detail.username).toBe("lstooge1");
                    resolve();
                }, {once: true});

                fireEvent.click(screen.getByText("Update"));
            }, {once: true});

            render(<UserForm />);
        });
    });

});
