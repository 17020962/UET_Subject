const axios = require('axios');
var CircularJSON = require('circular-json');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const LINK_ALL_SUBJECT = "http://112.137.129.115/tkb/listbylist.php";
const LINK_FROM_MSSV_BEFORE = "http://112.137.129.87/qldt/?SinhvienLmh%5BmasvTitle%5D=";
const LINK_FROM_MSSV_AFTER = "&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=028&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid";


function GetDataSubject() {

    this.allSubject = function (req, res, next) {
        axios.get(LINK_ALL_SUBJECT)
            .then(function (response) {
                // handle success

                var str = CircularJSON.stringify(response);

                // res.send(CircularJSON.stringify(response));
                const dom = new JSDOM(str);
                var listOption = dom.window.document.querySelectorAll("tbody tr");
                var AllSubject = [];

                for (var i = 0; i < listOption.length; i++) {
                    if (i >= 4) {
                        var list = listOption[i].querySelectorAll("td");
                        var subject = {
                            stt: "",
                            code: "",
                            name: "",
                            credits: "",
                            codeFull: "",
                            teacher: "",
                            numberStudent: "",
                            sessionOfDay: "",
                            daysOfTheWeek: "",
                            lession: "",
                            classRoom: "",
                            group: ""
                        }
                        var arrSubject = [];
                        list.forEach(element => {
                            arrSubject.push(element.textContent);
                        });
                        var k = 0;
                        for (var element in subject) {
                            subject[element] = arrSubject[k];
                            k++;
                        }
                        AllSubject.push(subject);
                    }
                }

                res.send(AllSubject);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }

    this.subjectStudent = function (req, res, next) {

        var mssv = req.body.mssv;

        axios.get(LINK_FROM_MSSV_BEFORE + mssv + LINK_FROM_MSSV_AFTER)
            .then(function (response) {
                // handle success
                var str = CircularJSON.stringify(response);
                // res.send(CircularJSON.stringify(response));
                const dom = new JSDOM(str);
                var listOption = dom.window.document.querySelectorAll("tbody tr");
                // console.log(listOption[0].querySelectorAll("td")[2].textContent);
                var resultArraySubject = [];
                for (var i = 0; i < listOption.length; i++) {
                    var list = listOption[i].querySelectorAll("td");

                    var subjectMSSV = {
                        stt:"",
                        mssv:"",
                        name:"",
                        dateOfbirth:"",
                        class:"",
                        codeFull:"",
                        subject:"",
                        group:"",
                        credits:"",
                        status:"",
                        nullChar:""
                    }

                    var arrSubject = [];
                    list.forEach(element=>{
                        // console.log(element.textContent);
                        arrSubject.push(element.textContent);
                    })

                    var k = 0;
                    for(var element in subjectMSSV){
                        subjectMSSV[element] = arrSubject[k];
                        k++;
                    }

                    resultArraySubject.push(subjectMSSV);


                }

                res.send(resultArraySubject);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }


}

module.exports = GetDataSubject;