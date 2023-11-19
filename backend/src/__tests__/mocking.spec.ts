import { v4 } from "uuid";

jest.mock('uuid',()=>({
    v4:jest.fn()
}))


describe("This mocks the uuid",()=>{
    it("Generates a unique ID",()=>{
        // const id = v4()
        const mockedv4 = jest.requireMock('uuid').v4
        
        mockedv4.mockImplementation(()=> " uniquid_de")

        console.log(v4());
        
    })
})