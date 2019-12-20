#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform float micVol;
uniform float slider01;
uniform bool bounce;
uniform float slider03;

uniform bool useStep;
uniform float frameCount;

void main() {
  vec2 uv = vTexCoord;
  float threshR;

  uv.y = 1.0 - uv.y;
  uv.x = 1.0 - uv.x;
  
  if (!bounce)
  {
  uv.y += micVol * slider03;
  uv.y = clamp(uv.y,0.0,1.0);
  }
  vec4 tex = texture2D(tex0, uv);


  if (useStep == true)
  {
  threshR = step(.4,tex.r);
  }
  else
  {
  threshR = tex.r;
  }
  
  float col = abs(sin(micVol));
  vec3 thresh = vec3(col*slider01, 0.0, threshR);
  
  // render the output
  gl_FragColor = vec4(thresh, 1.0);
}