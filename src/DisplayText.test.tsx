import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import DisplayText from "./DisplayText";
import UserTodos from "./UserTodos";
import "@testing-library/jest-dom/extend-expect";
afterEach(cleanup);

describe("Test DisplayText", () => {
  const userName = "testuser";
  const userFullName = "Dmitrii Tester";
  const getUserMock = (userName: string): jest.Mock<Promise<any>> => {
    const promise = new Promise<any>((res, rej) => {
      res({ name: userFullName });
    });
    const getUserFullName = jest.fn(async (userName: string): Promise<any> => {
      return promise;
    });
    return getUserFullName;
  };

  it("renders without crashing", () => {
    const { baseElement } = render(<DisplayText />);
    console.log(baseElement.innerHTML);
    expect(baseElement).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { baseElement } = render(<DisplayText />);
    expect(baseElement).toMatchSnapshot();
  });

  it("receives input text", () => {
    render(<DisplayText />);
    const input = screen.getByTestId("user-input");
    fireEvent.change(input, { target: { value: userName } });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(userName);
  });

  it("shows welcome message", async () => {
    //if getUserFullName is removed from here this test fails
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getUserFullName = getUserMock(userName);

    const msg = `Welcome to React testing, ${userFullName}!`;
    render(
      <>
        <DisplayText />
        <UserTodos userName={userName} />
      </>
    );
    const input = screen.getByTestId("user-input");
    const label = screen.getByTestId("final-msg");
    fireEvent.change(input, { target: { value: userName } });
    const btn = screen.getByTestId("input-submit");
    fireEvent.click(btn);

    expect(label).toBeInTheDocument();
    await waitFor(() => {
      expect(label.innerHTML).toBe(msg);
    });
  });
});
