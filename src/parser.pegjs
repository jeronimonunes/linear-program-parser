ProgLin = _ type:("max"/"min") _ '(' _ objective:Expression _ ')' _ restrictions:Restrictions {
    return new exports.ProgLin(type, objective, restrictions);
}

Expression = Addition

Restrictions = ("st:"/"sujeito a:") _ restrictions:(Restriction ';'? _)+ {
    return restrictions.map(r=>r[0]);
}

Restriction = left:Expression _ type:(">="/"<="/"=="/"=") _ right:Expression {
    switch(type) {
        case ">=":
            return new exports.Greater(left, right);
        case "<=":
            return new exports.Smaller(left, right);
        case "=":
        case "==":
            return new exports.Equality(left, right);
    }
}

Addition = head:Subtraction tail:(_ "+" _ Subtraction)* {
    if(tail.length) {
        const terms = [head,...tail.map(el=>el[3])];
        return new exports.Addition(terms);
    } else {
        return head;
    }
}

Subtraction = head:Multiplication tail:(_ "-" _ Multiplication)* {
    if(tail.length) {
        const terms = [head,...tail.map(el=>el[3])];
        return new exports.Subtraction(terms);
    } else {
        return head;
    }
}

Multiplication = head:Division tail:(_ "*" _ Division)* {
    if(tail.length) {
        const terms = [head,...tail.map(el=>el[3])];
        return new exports.Multiplication(terms);
    } else {
        return head;
    }
}

Division = head:Factor tail:(_ "/" _ Factor)* {
    if(tail.length) {
        const terms = [head,...tail.map(el=>el[3])];
        return new exports.Division(terms);
    } else {
        return head;
    }
}

Factor = "(" _ expr:Expression _ ")" { return new exports.Factor(expr); }
  / n:Integer? v:Id { return new exports.Variable(n || ONE, v)}
  / "-" v:Id { return new exports.Variable(NEG, v)}
  / Integer

Integer "integer"
  = _ [+-]?[0-9]+ { return new exports.Fraction(BigInt(text()), BigInt(1)) }

Id = [a-zA-Z][a-zA-Z0-9]* {
    return text()
}

_ "whitespace"
  = [ \t\n\r]*