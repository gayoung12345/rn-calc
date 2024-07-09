import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Button, { ButtonTypes } from "@/components/Button";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const { width: windowWidth } = useWindowDimensions();
  const btnWidth = (windowWidth - 5) / 4;

  const [result, setResult] = useState<number>(0);
  const [formula, setFormula] = useState<string>("");
  const [pointCheck, setPointCheck] = useState<boolean>(true);
  const [operatorCheck, setOperatorCheck] = useState<boolean>(true);

  const Operators = {
    ALLCLEAR: "C",
    DEL: "DEL",
    PLUS: "+",
    MULTY: "*",
    DIVIDE: "/",
    DOT: ".",
    MINUS: "-",
    EQUAL: "=",
  };

  const getNumber = (number: string) => {
    console.log(number);
    setFormula((prev) => prev + number);
    setOperatorCheck(true);
  };

  const getOperator = (oper: string) => {
    console.log(oper);
    // check
    if (operatorCheck) {
      setFormula((prev) => prev + oper);
      setOperatorCheck(false);
    }
  };

  const getPoint = (point: string) => {
    console.log(point);
    if (formula.length === 0) setOperatorCheck(false);
    // check
    if (pointCheck) {
      setFormula((prev) => prev + point);
      setPointCheck(false);
    }
  };
  const delNum = () => {
    console.log("del");
    let str = String(formula).slice(0, -1);
    formula.includes(".") ? setPointCheck(false) : setPointCheck(true); // 예외가 발생할 수 있음(소수연산)
    setFormula(str);
    setOperatorCheck(true);
  };

  const allClear = () => {
    console.log("ac");
    setResult(0);
    setFormula("");
    setPointCheck(true);
  };

  const calculate = () => {
    console.log("cal");
    try {
      const evalResult = eval(formula);
      if (isNaN(evalResult)) {
        setResult(0);
      } else if (evalResult === Infinity) {
        alert("0으로 나눌 수 없습니다.");
        setResult(0);
      } else {
        setResult(evalResult);
      }
    } catch (error) {
      console.error(error);
      setResult(0);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.formulaContainer}>
        <Text style={styles.text2}>{formula}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>

      <View style={{ height: 3, backgroundColor: "#aaaaaa" }}></View>

      <View style={styles.buttonPad}>
        <View style={styles.topContainer}>
          <Button
            title="AC"
            onPress={allClear}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={[styles.button, { width: btnWidth, height: btnWidth }]}
          />
          <Button
            title="Del"
            onPress={delNum}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={[styles.button, { width: btnWidth, height: btnWidth }]}
          />
          <Button
            title="/"
            onPress={() => getOperator("/")}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={[styles.button, { width: btnWidth, height: btnWidth }]}
          />
          <Button
            title="*"
            onPress={() => getOperator("*")}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={[styles.button, { width: btnWidth, height: btnWidth }]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.leftArea}>
            <View style={styles.numberArea}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  title={num.toString()}
                  onPress={() => getNumber(num.toString())}
                  buttonType={ButtonTypes.NUMBER}
                  buttonStyle={[
                    styles.button,
                    { width: btnWidth, height: btnWidth },
                  ]}
                />
              ))}
            </View>
            <View style={styles.bottomArea}>
              <Button
                title="0"
                onPress={() => getNumber("0")}
                buttonType={ButtonTypes.NUMBER}
                buttonStyle={[
                  styles.button,
                  { width: btnWidth, height: btnWidth },
                ]}
              />
              <Button
                title="."
                onPress={() => getPoint(".")}
                buttonType={ButtonTypes.NUMBER}
                buttonStyle={[
                  styles.button,
                  { width: btnWidth, height: btnWidth },
                ]}
              />
              <Button
                title="="
                onPress={calculate}
                buttonType={ButtonTypes.OPERATOR}
                buttonStyle={[
                  styles.button,
                  { width: btnWidth, height: btnWidth },
                ]}
              />
            </View>
          </View>
          <View style={styles.rightArea}>
            <Button
              title="-"
              onPress={() => getOperator("-")}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={[
                styles.button,
                { width: btnWidth, height: btnWidth },
              ]}
            />
            <Button
              title="+"
              onPress={() => getOperator("+")}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={[
                styles.button,
                { width: btnWidth, height: btnWidth },
              ]}
            />
            <Button
              title="("
              onPress={() => getNumber("(")}
              buttonType={ButtonTypes.NUMBER}
              buttonStyle={[
                styles.button,
                { width: btnWidth, height: btnWidth },
              ]}
            />
            <Button
              title=")"
              onPress={() => getNumber(")")}
              buttonType={ButtonTypes.NUMBER}
              buttonStyle={[
                styles.button,
                { width: btnWidth, height: btnWidth },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  formulaContainer: {
    backgroundColor: "#000000",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 5,
  },
  resultContainer: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  buttonPad: {
    flexDirection: "column",
    backgroundColor: "#000000",
    paddingTop: 1,
    paddingBottom: 50,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  leftArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rightArea: {
    paddingRight: 1,
    flexDirection: "column",
  },
  numberArea: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
  },
  bottomArea: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 60,
    fontWeight: "700",
    color: "#ffffff",
  },
  text2: {
    fontSize: 16,
    color: "#cccccc",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 60,
  },
});

export default Index;
