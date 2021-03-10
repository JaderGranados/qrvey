import Service from './project.service';

describe ('Query methods from "project.service.ts"', () => {
    test("getByUserId method", () => {
        const expected = expect.any([]);
        const result = Service.getByUserId("6044427f89761300273c4e8f");

        expect(result).toStrictEqual(expected);
    })
})