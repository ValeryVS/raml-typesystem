import ps= require("../src/parse")
import ts = require("../src/typesystem")
import chai = require("chai");
import assert = chai.assert;

describe("Simple validation testing",function() {
    it("Unknown property error message #8", function () {
        var tp = ps.parseJSONTypeCollection({

            types:{
                XX:{
                  type:"object",
                  properties:{
                      c:"string",
                      y:"boolean"
                  },
                  example:{
                      c:"A",
                      vv:3
                  }
                }
            }
        });
        var t=tp.getType("XX");
        var st=t.validateType(ts.builtInRegistry());
        var f=false;
        st.getErrors().forEach(x=>{
            if (x.getMessage().indexOf("Unknown property")!=-1){
                f=true;
            }
        });
        assert.isTrue(f);
    });
    it("Type error message #7", function () {
        var tp = ps.parseJSONTypeCollection({

            types:{
                XX:{
                    type:"object",
                    properties:{
                        c:"string",
                    },
                    example:{
                        c:4,
                    }
                }
            }
        });
        var t=tp.getType("XX");
        var st=t.validateType(ts.builtInRegistry());
        var f=false;
        st.getErrors().forEach(x=>{
            if (x.getMessage().indexOf("string is expected")!=-1){
                f=true;
            }
        });
        assert.isTrue(f);
    });
    it("Type error message #4", function () {
        var tp = ps.parseJSONTypeCollection({

            types:{
                XX:{
                    type:"object",
                    properties:{
                        c:"string",
                    },
                    example:{

                    }
                }
            }
        });
        var t=tp.getType("XX");
        var st=t.validateType(ts.builtInRegistry());
        var f=false;
        st.getErrors().forEach(x=>{
            if (x.getMessage().indexOf("Required property:")!=-1){
                f=true;
            }
        });
        assert.isTrue(f);
    });
});