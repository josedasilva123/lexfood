import { render, screen } from "@testing-library/react";
import Select from ".";

describe("<Select />", () => {
   it("should render correctly", () => {
      render(
         <Select>
            <option value="">Exemplo</option>
         </Select>
      );

      const select = screen.getByRole("listbox");
      const option = screen.getByText("Exemplo");

      expect(select).toBeInTheDocument();
      expect(option).toBeInTheDocument();
   });

   it("should render label when is passed as a prop", () => {
      render(
         <Select label="Teste">
            <option value="">Exemplo</option>
         </Select>
      );

      const label = screen.getByText("Teste");
      expect(label).toBeInTheDocument();
   });

   it("should render error p when error is valid", () => {
      const errorMock = {
         message: "Existe um erro.",
      };
      render(
         <Select error={errorMock}>
            <option value="">Exemplo</option>
         </Select>
      );

      const error = screen.getByText("Existe um erro.");
      expect(error).toBeInTheDocument();
   });
});
