/* eslint-disable testing-library/no-debugging-utils */
import { screen, render } from "@testing-library/react"
import Input from "."

describe("<Input/>", () => {
    it("should render correctly", () => {
        render(
            <Input />
        );
        
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    })

    it("should render a input type text", () => {
        render(
            <Input type="text" />
        );
        
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute('type', 'text');
    })

    it("should render input with placeholder", () => {
        render(
            <Input placeholder="Teste" />
        );
        
        const input = screen.getByPlaceholderText("Teste");
        expect(input).toBeInTheDocument();
    })

    it("should render label when is passed as a prop", () => {
        render(
            <Input label="Exemplo" />
        );
        
        const label = screen.getByText("Exemplo");
        expect(label).toBeInTheDocument();
    })

    it("should render error p when error is valid", () => {
        const mockError = {
            message: "Existe um erro."
        };
        
        render(
            <Input error={mockError} />
        );
        
        const error = screen.getByText("Existe um erro.");

        expect(error).toBeInTheDocument();
    })
})