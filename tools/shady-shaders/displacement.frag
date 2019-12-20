#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform sampler2D tex1;
uniform float micVol;
uniform float amt;

void main() {
  vec2 uv = vTexCoord;
  float threshR;

  uv = 1.0 - uv;

  vec4 cam = texture2D(tex0, uv);

  // lets get the average color of the rgb values
  float avg = dot(cam.rgb, vec3(0.33333));

  // then spread it between -1 and 1
  avg = avg * 2.0 - 1.0;

  // we will displace the image by the average color times the amt of displacement 
  float disp = avg * amt;
  uv.x += disp; //apply displacement on x-axis;

  // displacement works by moving the texture coordinates of one image with the colors of another image
  // add the displacement to the texture coordinages
  
  vec2 uv2 = vTexCoord;
  uv2.y = 1.0 - uv2.y;

  vec4 pup = texture2D(tex1, uv);

  // output the image
  gl_FragColor = pup;
}