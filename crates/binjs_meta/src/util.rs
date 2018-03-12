//! Miscellaneous utilities.

extern crate inflector;

pub trait ToStr {
    /// Return the value as a `str`.
    fn to_str(&self) -> &str;
    fn newline(&self) -> String {
        format!("{}\n", self.to_str())
    }
}

impl<'a> ToStr for &'a str {
    fn to_str(&self) -> &str {
        *self
    }
}

impl ToStr for str {
    fn to_str(&self) -> &str {
        self
    }
}

impl ToStr for String {
    fn to_str(&self) -> &str {
        &self
    }
}

/// A string or string-like construction that can be
/// converted to upper case, lower case, class case, etc
pub trait ToCases: ToStr {
    /// Return the value in class case, e.g.
    ///
    /// ```
    /// use binjs_meta::util::ToCases;
    ///
    /// assert_eq!(&"foo_bar".to_class_cases(), "FooBar");
    /// assert_eq!(&"fooBars".to_class_cases(), "FooBars");
    /// ```
    fn to_class_cases(&self) -> String {
        self.to_str().to_class_cases()
    }

    /// Return the value in a format suitable for use as a cpp `enum`
    /// variants.
    ///
    /// ```
    /// use binjs_meta::util::ToCases;
    ///
    /// assert_eq!(&"foo_bar".to_cpp_enum_case(), "FooBar");
    /// assert_eq!(&"fooBars".to_cpp_enum_case(), "FooBars");
    /// assert_eq!(&"+=".to_cpp_enum_case(), "PlusAssign");
    /// ```
    fn to_cpp_enum_case(&self) -> String {
        self.to_str().to_cpp_enum_case()
    }

    /// Return the value in a format suitable for use as a C++ field name
    /// or identifier.
    ///
    /// ```
    /// use binjs_meta::util::ToCases;
    ///
    /// assert_eq!(&"foo_bar".to_cpp_field_case(), "fooBar");
    /// assert_eq!(&"fooBars".to_cpp_field_case(), "fooBars");
    /// assert_eq!(&"class".to_cpp_field_case(), "class_");
    /// ```
    fn to_cpp_field_case(&self) -> String {
        self.to_str().to_cpp_field_case()
    }

    /// Return the value in a format suitable for use as a Rust field name
    /// or identifier.
    ///
    /// ```
    /// use binjs_meta::util::ToCases;
    ///
    /// assert_eq!(&"foo_bar".to_rust_identifier_case(), "foo_bar");
    /// assert_eq!(&"fooBars".to_rust_identifier_case(), "foo_bars");
    /// assert_eq!(&"self".to_rust_identifier_case(), "self_");
    /// ```
    fn to_rust_identifier_case(&self) -> String {
        self.to_str().to_rust_identifier_case()
    }
}

impl<T> ToCases for T where T: ToStr {
    fn to_class_cases(&self) -> String {
        let result = inflector::cases::pascalcase::to_pascal_case(self.to_str());
        assert!(result.to_str().len() != 0, "Could not convert {} to class case", self.to_str() );
        result
    }
    fn to_cpp_enum_case(&self) -> String {
        match self.to_str() {
            "+=" => "PlusAssign".to_string(),
            "-=" => "MinusAssign".to_string(),
            "*=" => "MulAssign".to_string(),
            "/=" => "DivAssign".to_string(),
            "%=" => "ModAssign".to_string(),
            "**=" => "PowAssign".to_string(),
            "<<=" => "LshAssign".to_string(),
            ">>=" => "RshAssign".to_string(),
            ">>>=" => "UrshAssign".to_string(),
            "|=" => "BitOrAssign".to_string(),
            "^=" => "BitXorAssign".to_string(),
            "&=" => "BitAndAssign".to_string(),
            "," => "Comma".to_string(),
            "||" => "LogicalOr".to_string(),
            "&&" => "LogicalAnd".to_string(),
            "|" => "BitOr".to_string(),
            "^" => "BitXor".to_string(),
            "&" => "BitAnd".to_string(),
            "==" => "Eq".to_string(),
            "!=" => "Neq".to_string(),
            "===" => "StrictEq".to_string(),
            "!==" => "StrictNeq".to_string(),
            "<" => "LessThan".to_string(),
            "<=" => "LeqThan".to_string(),
            ">" => "GreaterThan".to_string(),
            ">=" => "GeqThan".to_string(),
            "<<" => "Lsh".to_string(),
            ">>" => "Rsh".to_string(),
            ">>>" => "Ursh".to_string(),
            "+" => "Plus".to_string(),
            "-" => "Minus".to_string(),
            "~" => "BitNot".to_string(),
            "*" => "Mul".to_string(),
            "/" => "Div".to_string(),
            "%" => "Mod".to_string(),
            "**" => "Pow".to_string(),
            "!" => "Not".to_string(),
            "++" => "Incr".to_string(),
            "--" => "Decr".to_string(),
            _ => {
                let class_cased = self.to_class_cases();
                assert!(&class_cased != "", "FIXME: `to_class_cases` does not handle {} yet", self.to_str());
                class_cased
            }
        }
    }
    fn to_cpp_field_case(&self) -> String {
        let snake = inflector::cases::camelcase::to_camel_case(self.to_str());
        match &snake as &str {
            "class" => "class_".to_string(),
            "operator" => "operator_".to_string(),
            "const" => "const_".to_string(),
            "void" => "void_".to_string(),
            "delete" => "delete_".to_string(),
            "in" => "in_".to_string(),
            // Names reserved by us
            "result" => "result_".to_string(),
            "kind" => "kind_".to_string(),
            // Special cases
            "" => unimplemented!("FIXME: `to_cpp_field_case` does not handle {} yet", self.to_str()),
            _ => snake
        }
    }
    fn to_rust_identifier_case(&self) -> String {
        let snake = inflector::cases::snakecase::to_snake_case(self.to_str());
        match &snake as &str {
            "self" => "self_".to_string(),
            "super" => "super_".to_string(),
            "type" => "type_".to_string(),
            "" => unimplemented!("FIXME: `to_rust_identifier_case` does not handle {} yet", self.to_str()),
            _ => snake
        }
    }
}

/// A string or string-like construction that can be reindented.
pub trait Reindentable {
    /// Remove leading whitespace, replace it with `prefix`.
    ///
    /// If `self` spans more than one line, the leading whitespace
    /// is computed from the first line and extracted from all lines
    /// and `prefix` is added to all lines.
    ///
    /// ```
    /// use binjs_meta::util::Reindentable;
    ///
    /// assert_eq!(&"abc".reindent("   "), "   abc");
    /// assert_eq!(&" def".reindent("   "), "   def");
    /// assert_eq!(&"  ghi".reindent("   "), "   ghi");
    /// assert_eq!(&" jkl\n    mno".reindent("   "), "   jkl\n      mno");
    /// ```
    fn reindent(&self, prefix: &str) -> String;

    /// Remove leading whitespace, replace it with `prefix`,
    /// ensure that the text fits within `width` columns.
    ///
    /// If `self` spans more than one line, the leading whitespace
    /// is computed from the first line and extracted from all lines.
    /// and `prefix` is added to all lines.
    ///
    /// If the result goes past `width` columns, `self` is split
    /// into several lines to try and fit within `width` columns.
    ///
    /// ```
    /// use binjs_meta::util::Reindentable;
    ///
    /// assert_eq!(&"abc".fit("// ", 30), "// abc");
    /// assert_eq!(&" def".fit("// ", 30), "// def");
    /// assert_eq!(&"  ghi".fit("// ", 30), "// ghi");
    /// assert_eq!(&" jkl\n    mno".fit("// ", 30), "// jkl\n//    mno");
    /// assert_eq!(&"abc def ghi".fit("// ", 8), "// abc\n// def\n// ghi");
    /// assert_eq!(&"abc def ghi".fit("// ", 5), "// abc\n// def\n// ghi");
    /// ```
    fn fit(&self, prefix: &str, width: usize) -> String;
}

impl<T> Reindentable for T where T: ToStr {
    fn reindent(&self, prefix: &str) -> String {
        use itertools::Itertools;

        let str = self.to_str();

        // Determine the number of whitespace chars on the first line.
        // Trim that many whitespace chars on the following lines.
        if let Some(first_line) = str.lines().next() {
            let indent_len = first_line.chars()
                .take_while(|c| char::is_whitespace(*c))
                .count();
            format!("{}", str.lines()
                .map(|line|
                    if line.len() > indent_len {
                        format!("{prefix}{text}",
                            prefix = prefix,
                            text = line[indent_len..].to_string())
                    } else {
                        "".to_string()
                    })
                .format("\n"))
        } else {
            "".to_string()
        }
    }

    fn fit(&self, prefix: &str, columns: usize) -> String {
        use itertools::Itertools;

        let str = self.to_str();
        // Determine the number of whitespace chars on the first line.
        // Trim that many whitespace chars on the following lines.
        if let Some(first_line) = str.lines().next() {
            let indent_len = first_line.chars()
                .take_while(|c| char::is_whitespace(*c))
                .count();
            let mut lines = vec![];
            'per_line: for line in str.lines() {
                eprintln!("Inspecting line {}", line);
                let text = &line[indent_len..];
                let mut gobbled = 0;
                while text.len() > gobbled {
                    let mut rest = &text[gobbled..];
                    eprintln!("Line still contains {} ({})", rest, gobbled);
                    if rest.len() + prefix.len() > columns {
                        // Try and find the largest prefix of `text` that fits within `columns`.
                        let mut iterator = rest.chars()
                            .enumerate()
                            .filter(|&(_, c)| char::is_whitespace(c));
                        let mut last_whitespace_before_break = None;
                        let mut first_whitespace_after_break = None;
                        while let Some((found_pos, _)) = iterator.next() {
                            if found_pos + prefix.len() <= columns {
                                last_whitespace_before_break = Some(found_pos);
                            } else {
                                first_whitespace_after_break = Some(found_pos);
                                break;
                            }
                        }

                        match (last_whitespace_before_break, first_whitespace_after_break) {
                            (None, None) => {
                                eprintln!("Ok, string didn't contain any whitespace: '{}'", rest);
                                // Oh, `rest` does not contain any whitespace. Well, use everything.
                                lines.push(format!("{prefix}{rest}",
                                    prefix = prefix,
                                    rest = rest));
                                continue 'per_line
                            }
                            (Some(pos), _) | (None, Some(pos)) if pos != 0 => {
                                eprintln!("Best whitespace found at {}", pos);
                                // Use `rest[0..pos]`, trimmed right.
                                gobbled += pos + 1;
                                let line = format!("{prefix}{rest}",
                                    prefix = prefix,
                                    rest = rest[0..pos].trim_right());
                                lines.push(line)
                            }
                            _else => {
                                panic!("{:?}", _else)
                            }
                        }
                    } else {
                        let line = format!("{prefix}{rest}",
                            prefix = prefix,
                            rest = rest);
                        lines.push(line);
                        continue 'per_line
                    }
                }
            }
            format!("{lines}",
                lines = lines.iter()
                    .format("\n"))
        } else {
            "".to_string()
        }

    }
}

impl Reindentable for Option<String> {
    fn reindent(&self, prefix: &str) -> String {
        match *self {
            None => "".to_string(),
            Some(ref string) => string.reindent(prefix)
        }
    }
    fn fit(&self, prefix: &str, columns: usize) -> String {
        match *self {
            None => "".to_string(),
            Some(ref string) => string.fit(prefix, columns)
        }
    }
}
