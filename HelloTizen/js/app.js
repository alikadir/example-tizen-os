/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {

    $.getJSON("http://spor.api.piri.net/api/v1/Headline/GetHeadlines", function (data) {
         $("#haberler").empty();
        for (var i in data.headlinesC)
            $("#haberler").append("<a href='"+data.headlinesC[i].shareUrl+"' target='_blank'><img src='" + data.headlinesC[i].media.thumbnail + "' style='width:100%;'><br><br>" + data.headlinesC[i].spot + "</a><hr>");

    });


    /**
     * Handles the hardware key event.
     * @private
     * @param {Object} event - The hardware key event object
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                if (confirm("Geri tuşuna basıldı. çıkmak istermisiniz?"))
                    tizen.application.getCurrentApplication().exit();

            } catch (ignore) { }
        }
        if (event.keyName === "main") {
            try {
                if (confirm("Home tuşuna basıldı. çıkmak istermisiniz?"))
                    tizen.application.getCurrentApplication().exit();

            } catch (ignore) { }
        }
    }

    /**
     * Initializes the application.
     * @private
     */
    function init() {
    	debugger;
    	/* begin swipe  */
    	
    	 var page = document.getElementById("pageSwipeList"),
         listElement = page.getElementsByClassName("ui-swipelist-list")[0],
         swipeList;
     page.addEventListener("pageshow", function() {
        /* Make swipe list object */
        swipeList = new tau.widget.SwipeList(listElement, {
           swipeTarget: "li",
           swipeElement: ".ui-swipelist"
        });
     });
     page.addEventListener("pagehide", function() {
        /* Release object */
        swipeList.destroy();
     });
    	
    	/* end swipe */
    	
        var btn = document.querySelector("#btn");
        var txt1 = document.querySelector("#txt1");
        var txt2 = document.querySelector("#txt2");

        var img = document.querySelector("#img");

        var imgcount = 1;

        var buyu = document.querySelector("#buyu");

        // Add hardware event listener
        document.addEventListener("tizenhwkey", keyEventHandler);


        btn.addEventListener("click", function () {
            var sayi1 = parseInt(txt1.value);
            var sayi2 = parseInt(txt2.value);

            btn.innerHTML = sayi1 + sayi2;

        });

        img.addEventListener("click", function () {

            imgcount++;

            if (imgcount > 6)
                imgcount = 1;

            img.src = "images/" + imgcount + ".jpg";
        });

        buyu.addEventListener("click", function () {
            buyu.style.width = "200px";
            buyu.style.height = "400px";
        });

        
        /* begin location */
        
        var options = {enableHighAccuracy: true, maximumAge: 600000, timeout: 0};

        function successCallback(position)
        {
        	
        	$.post( "http://apisimulator.pho.fm/push-location?msg=deneme", position );
        
        }

        function errorCallback(error)
        {
        	$.post( "http://apisimulator.pho.fm/push-location?msg=deneme", error);
        }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        
        
        /* end location */
    }

    // The function "init" will be executed after the application successfully loaded.
    window.onload = init;
}());