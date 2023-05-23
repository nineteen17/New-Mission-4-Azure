import { getMockReq, getMockRes } from "@jest-mock/express";
import {getAllTasks, getOneTask} from "../../controllers/taskController";


//Mocking test 
describe("getAllTasks", () => {
    it("should send all tasks via response", () => {
        // Arrange
        const reqMock = getMockReq();
        const resMock = getMockRes(); 
       
        // Act
        getAllTasks(reqMock, resMock.res);

        // Assert
        expect(resMock.res.send).toBeCalledTimes(1);
    });
});


describe("getOneTask", () => {
    it("should send 404 does not exist", () => {
        // Arrange
        const reqMock = getMockReq({ params: { id: "22" } });
        const resMock = getMockRes();
       
        // Act
        getOneTask(reqMock, resMock.res);

        // Assert
        expect(resMock.res.status).toBeCalledWith(404);
    });
});
