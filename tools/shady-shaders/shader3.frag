#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform float micVol;
uniform float intensity;
uniform bool volOn;

// 2D Random... Everyone uses this pseudo random function but noone knows where it's from
float random (in vec2 uv) {
    return fract(sin(dot(uv.xy,vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
  vec2 uv = vTexCoord;
  float i;
  float f;

  uv = 1.0 - uv;

  vec4 cam = texture2D(tex0, uv);

    if (volOn == true)
    {
        float i = floor(micVol);  // "integer"
        float f = fract(micVol);  // fraction
        float y = random(uv);
        uv.y += mix (y , i , f*intensity);
    }
    else
    {
        float i = floor(micVol);  // "integer
        float y = random(uv);
        uv.y += mix (y , i , intensity * .3);

    }

  vec4 img = texture2D(tex0, uv);

  if (volOn == false)
  {
    //img.r = normalize(mix (img.r, f , .9));
   i = floor(micVol);  // "integer
    float y = random(uv);
    f = fract(micVol);
    img.r += mix(y , i*2.0 , f*10.0);
    img.b += mix(y , i , f*30.0);
  }

  // output the image
  gl_FragColor = img;
}