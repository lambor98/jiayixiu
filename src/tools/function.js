/*
 * @Author: your name
 * @Date: 2020-09-29 19:27:08
 * @LastEditTime: 2020-10-12 20:51:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \git项目\jiayixiu\src\tools\function.js
 */
export function  getObjectURL(file) {  
    var url = null;  
    if (window.createObjcectURL != undefined) {  
        url = window.createOjcectURL(file);  
    } else if (window.URL != undefined) {  
        url = window.URL.createObjectURL(file);  
    } else if (window.webkitURL != undefined) {  
        url = window.webkitURL.createObjectURL(file);  
    }  
    return url;  
    }


export function clone(obj){

}