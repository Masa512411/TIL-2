var assert = chai.assert;

describe('Test', function() {
  it('should not equal when true compare to false', function() {
    assert.equal(true, true);
  });

  it('should not test', function() {
    assert.notEqual(true, true);
  });


})

describe('Array Test', function() {
  it('should isTrue', function() {
    var arr = [0, 1, 2];
    assert.isTrue(Array.isArray(arr));
  });

  it('should array length', function() {
    var arr = [];
    arr.push(1);
    assert.equal(arr.length, 1);
  });
})

describe('String Test', function() {
  it('should equal', function() {
    var str = "dummy string";
    var result = checkType(str);
    assert.equal(result, 'string');
  });
})

describe('async ajax test', function(){
    it('should get "code-squad" name when receive ajax response', function(done) {
        var url = 'https://api.github.com/repos/latilt/Project';
        var fn = function(result) {
                var name = result.owner.login;
                assert.equal(name, 'code-squad111111'); //code-squad
                console.log(1);
                done();
        }
        xhr(url,fn);
    })
})

describe('another test', function(){
    it('should equal..', function() {
        assert.equal(true,true);
        console.log(2);
    });
});
