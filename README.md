# Data Verification Platform
Data validation platform is an application developed in JavaScript to verify the CFS survey response data and generate a report based on the results. 

## Compatibility
The validation platform is compatible with all modern web browsers including Google Chrome, Microsoft Edge, Mozilla Firefox, Internet Explorer, Safari, Opera, Stock browser on Android, and Safari on iOS. While most of the libraries used in validation platform might run without major issues in older browser versions, they are not actively tested to ensure compatibility.

## Latest Prototype
The latest tested prototype is located in the 'Test' folder. The code in individual team members' folders is work in progress and may not run correctly. 

## How to Run
Clone or download the repository from the GitHub page or using your favorite Git client. Google Chrome usually runs jQuery (which is the major JavaScript library used in the development of the Data Validation Platform) locally without the need to be hosted on a web server. There is also a Java based portable web server ([WebServerLite.jar] (http://www.jibble.org/jibblewebserver.php) ) included in the Test folder that can be used to host the tool. 
WebServerLite.jar is platform independent and can run on any computer running [Java Run Environment (JRE)] (http://www.oracle.com/technetwork/java/javase/jre8-downloads-2133155.html). Run the following command in command line/Terminal to ensure you have JRE installed on your system: 
```
java -version
```

You will see information regarding the JRE installed on your system similar to the following:
 
```
java version "1.8.0_171"
Java(TM) SE Runtime Environment (build 1.8.0_171-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.171-b11, mixed mode) 
```

You may have to install JRE or use a different web server to run the validation platform if JRE is not installed on your computer. Once you made sure you have JRE, navigate to the Test folder in the command line/terminal and use the following command to run WebServerLite.jar:

```
java -jar WebServerLite.jar ./ 8080
```
Finally, navigate to `http://localhost:8080/vpdemo.html` on your web browser. 