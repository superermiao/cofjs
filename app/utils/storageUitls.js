/*
import React,{Component} from 'react';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

//初始化react-native-storage
let storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 存储引擎：对于RN使用AsyncStorage
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires:null,  //100天
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
});

export const saveData=function (id,data,expires) {
    storage.save({
        key:'user',
        id:id,
        data:data,
        expires:expires,
    })
}

export  const inquireData=function (id,callback) {
    storage.load({
        key:'user',
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,
        id:id,
        syncInBackground: false
    }).then(res=>{
        console.log('本地获取的数据: '+res);
        callback(res);
    }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    });


    export  const removeData=function (keyname,id){
        // 删除单个数据
        storage.remove({
            key: keyname,
            id:id,
        });
    }
};

global.storage=storage;
*/
