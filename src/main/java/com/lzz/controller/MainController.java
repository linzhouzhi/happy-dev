package com.lzz.controller;

import com.lzz.logic.MainLogic;
import com.lzz.model.Response;
import com.lzz.model.User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by lzz on 2018/1/21.
 */
@org.springframework.stereotype.Controller
public class MainController {
    @Resource
    MainLogic logic;

    @RequestMapping("/happy")
    public String happy(Model model) {
        return "happy";
    }

    @RequestMapping("/user-list")
    @ResponseBody
    public List<User> userList() {
        return logic.userList();
    }

    @RequestMapping( value = "/add-user", method = RequestMethod.POST)
    @ResponseBody
    public Response startConsumer(@RequestBody User user) {
        System.out.println( user );
        return Response.OK();
    }

    @RequestMapping("/remove-user")
    @ResponseBody
    public Response removeUser(@RequestParam String username) {
        return Response.OK();
    }

    @RequestMapping("/open")
    @ResponseBody
    public Response open(@RequestParam String username) {
        return Response.OK();
    }

    @RequestMapping("/close")
    @ResponseBody
    public Response close(@RequestParam String username) {
        return Response.OK();
    }
}
