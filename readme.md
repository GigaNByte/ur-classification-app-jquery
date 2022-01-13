
# Mobilenet Image Classification Example Demo  App (JQuery )

![](./readme/demo1.gif)

This single page application uses TensorFlow.js and Mobilenet 1.0 model trained on Imagenet2012 dataset to classify uploaded images and provide short description about them from MediaWiki (Wikipedia) API . App stores recent classification in gallery.

This app is related with the demo react app: Mobilenet Image Classification Example Demo App (React).


##  Setup


This app requires to be run in web server due to CORS (App processes images).

You will need to have nodejs in order to run this demo.  
For example you can use node.js based http-server. To run server this command in app directory:
</br>
<code>
npx http-server@13.0.2
</code>
</br>
Then open  http://127.0.0.1:8080  in browser

</br>

## Libraries, Technologies


<ul>
<li>JQuery: 3.6.0</li>
<li>TensorFlow.js: 1.0.1</li>
<li><a href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet">MobileNet: 1.0.0</a></ul>

