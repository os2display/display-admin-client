import contentString from './content-string';

describe("Content string", () => {

  it("It creates a string: 'test and test'", () => {
    expect(contentString([{ name: "test" }, { name: "test" }], "and")).to.eq("test and test")
  });

  it("It creates a string: 'test, hest or test'", () => {
    expect(contentString([{ name: "test" }, { label: "hest" }, { name: "test" }], "or")).to.eq("test, hest or test")
  });
  it("It creates a string: 'test'", () => {
    expect(contentString([{ name: "test" }], "or")).to.eq("test")
  });

});
