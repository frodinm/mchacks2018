const addCryptoButton_component = require("./addCryptoButton.component")
// @ponicode
describe("checkIfExist", () => {
    let inst

    beforeEach(() => {
        inst = new addCryptoButton_component.AddCryptoButton()
    })

    test("0", () => {
        let callFunction = () => {
            inst.checkIfExist("1.0.0", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.checkIfExist("4.0.0-beta1\t", "Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.checkIfExist("v4.0.0-rc.4", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.checkIfExist("4.0.0-beta1\t", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.checkIfExist("4.0.0-beta1\t", "This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.checkIfExist(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("handleSearch", () => {
    let inst

    beforeEach(() => {
        inst = new addCryptoButton_component.AddCryptoButton()
    })

    test("0", () => {
        let callFunction = () => {
            inst.handleSearch("HELLO, WORLD!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.handleSearch("heLlo, wOrLD!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.handleSearch("foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.handleSearch("This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.handleSearch("FoO BaR")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.handleSearch(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new addCryptoButton_component.AddCryptoButton()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
