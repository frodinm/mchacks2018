const rewire = require("rewire")
const compareBox_component = rewire("./compareBox.component")
const timeConverter = compareBox_component.__get__("timeConverter")
// @ponicode
describe("timeConverter", () => {
    test("0", () => {
        let callFunction = () => {
            timeConverter(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            timeConverter(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            timeConverter("2017-09-29T19:01:00.000")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            timeConverter("Mon Aug 03 12:45:00")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            timeConverter("2017-09-29T23:01:00.000Z")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            timeConverter(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
