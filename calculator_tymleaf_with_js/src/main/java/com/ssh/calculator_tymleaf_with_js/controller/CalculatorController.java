package com.ssh.calculator_tymleaf_with_js.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class CalculatorController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/calculate")
    @ResponseBody //response 형태의 응답을 가져가겠다.
    public Map<String, Double> calculate(
            @RequestParam double num1,
            @RequestParam double num2,
            @RequestParam String operator
    ) {
        double result;

        switch (operator) {
            case "add":
                result  = num1 + num2;
                break;
            case "subtract":
                result = num1 -num2;
                break;
            case "multiply" :
                result = num1 * num2;
                break;
            case "divide" :
                result = num1 != 0 ? num1 / num2 : Double.NaN; //NaN : 넘버가 아니다
                break;

            default:
                result = Double.NaN;
        }

        return Map.of("result", result);

//        publicMap<String, Double> calculate = new HashMap<>();
//        calculate.put("result", double)
        // 위 두줄이 Map,of 축약한것

    }//계산 결과
}
