package com.shardis.spring.angular2.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/app/**")
    public String app() {
        return "index";
    }
}
