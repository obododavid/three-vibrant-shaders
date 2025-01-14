uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
float PI = 3.1415926553589793238;

void main(){

    float diff = dot(vec3(1.), vNormal);
    gl_FragColor = vec4(vUv , 0.0, 1.);
    gl_FragColor = vec4(vNormal, 1.);
    gl_FragColor = vec4(abs(sin(diff*10.)));
}