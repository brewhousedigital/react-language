describe(`The Question Detail Component`, () => {
  /*beforeEach(() => {
    console.log("Before each!")
  })

  beforeAll(() => {
    console.log("Before all!")
  })*/

  it(`Should not regress`, () => {
    expect(2 + 2).toEqual(4);
  })

  it.skip(`Should also add`, () => {
    expect(5 + 5).toEqual(11);
  })
})





describe("Async Tests", () => {
  it("Should Wait 1", done => {
    setTimeout(done, 1000)
  })

  it("Should Wait 2", () => {
    return new Promise(
        resolve => setTimeout(resolve, 3000)
    )
  })
})
