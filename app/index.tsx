import Button, { ButtonTypes } from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";

// 기호
const Operators = {
  CLEAR: "C",
  PLUS: "+",
  MINUS: "-",
  EQUAL: "=",
};

const Index = () => {
  const [result, setResult] = useState<number>(0);
  const [formula, setFormula] = useState<(string | number)[]>([]);

  // 가로 길이
  const windowWidth = useWindowDimensions().width;
  const btnWidth = (windowWidth - 5) / 4;

  // 숫자를 눌렀을 경우
  const onPressNumber = (number: number) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  // 연산
  const calculate = () => {
    let calculatedNumber = formula[0] as number; // 이전 결과값을 가져옴
    let operator = "";
    let tempResult = calculatedNumber;

    for (let i = 1; i < formula.length; i++) {
      const value = formula[i];
      if (typeof value === "string") {
        operator = value;
      } else if (typeof value === "number") {
        if (operator === Operators.PLUS) {
          tempResult += value;
        } else if (operator === Operators.MINUS) {
          tempResult -= value;
        }
      }
    }

    setResult(tempResult);
    setFormula([tempResult]);
  };

  // 기호를 눌렀을 경우
  const onPressOperator = (operator: string) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]); // 초기화 버튼 처리: 수식 초기화
        setResult(0); // 초기화 버튼 처리: 결과 초기화
        return;

      case Operators.EQUAL:
        calculate(); // '=' 버튼 처리: 현재 수식으로 계산 수행
        return;

      default:
        // 연산자 추가 처리
        if (formula.length === 0 || isNaN(formula[formula.length - 1])) {
          return; // 수식이 비어있거나 마지막 요소가 숫자가 아닌 경우 처리하지 않음
        }
        setFormula((prev) => [...prev, operator]); // 연산자를 수식에 추가
        return;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>
      <View style={{ height: 10, backgroundColor: "#ffffff" }}></View>
      <View style={styles.buttonContainer}>
        <View style={styles.leftArea}>
          <View style={styles.numberArea}>
            {/* 숫자버튼 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{
                  width: btnWidth,
                  height: btnWidth,
                  marginBottom: 1,
                }}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>
          <View style={styles.buttomArea}>
            {/* 0, = 버튼 */}
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{
                width: btnWidth * 2 + 1,
                height: btnWidth,
                marginTop: 1,
              }}
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title="="
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{
                width: btnWidth,
                height: btnWidth,
                marginTop: 1,
              }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>
        <View style={styles.rightArea}>
          {/* 연산버튼 */}
          <Button
            title="C"
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width: btnWidth, height: btnWidth, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="-"
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width: btnWidth, height: btnWidth, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="+"
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width: btnWidth, height: btnWidth * 2 + 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#333333",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#a5b4fc",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 1,
  },
  button: {
    width: 70,
    height: 100,
  },
  text: {
    fontSize: 60,
    color: "#ff99ff",
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  leftArea: {
    width: "75%",
  },
  rightArea: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  numberArea: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
  },
  buttomArea: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Index;
