<style lang="scss">

@import "../scss/_logic.scss";
.colorsStyleguide {
    float: left;
    padding-right: 5px;
    box-sizing: border-box;
    & li {
        float: left;
        margin: 10px 0;
        @media only screen and (max-width: 900px) {
            width: 33%!important;
        };
    }
    &.primary {
        width: 46.67%;
        & li {
            width: 14.28%;
        }
    }
    &.secondary {
        width: 33.33%;
        & li {
            width: 20%;
        }
    }
    &.accents {
        width: 20%;
        & li {
            width: 33.33%;
        }
    }
    @media only screen and (max-width: 900px) {
        width: 100%!important;
    };
}

.textEx {
    font-size: 1.5em;
}

@mixin colorsStyleguide() {
    @each $name,
    $color in $colors {
        .colorsStyleguide {
            list-style-type: none;
            list-style-position: outside;
            & .#{$name} {
                padding-left: 0px;
                margin: 0;
                &:before {
                    content: "";
                }
                & .color {
                    background: color($name, base);
                    padding: 40px;
                    width: 100%;
                    box-sizing: border-box;
                    &:hover {
                        background: color($name, dark);
                    }
                }
                & .colorName {
                    &:after {
                        content: '' + $name + '';
                    }
                }
                & .colorHex {
                    background: #ffffff;
                    text-align: center;
                    padding: 10px 0;
                    &:after {
                        content: '' + color($name, base) + '';
                    }
                }
            }
        }
    }
}

@include colorsStyleguide();

</style>

<script>
    import dropDown from '../components/drop-down.vue';

    export default {
        components: {
            dropDown
        },
        data: function() {
          return {
            months: [
              'January',
              'Febuary',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September'
            ],
            countries: [
              'United States',
              'Egypt',
              'Austrialia'
            ]
          }
        }
    }
</script>

<template>

<div class="inner-wrapper">
    <h1>Project Style Guide</h1>

    <div class="row">
        <h2>01 Color Palettes</h2>
        <hr>

        <div class="col-md-12">

            <ul class="colorsStyleguide primary">
                <h4>Primary Colors</h4>
                <li class="primary1">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="primary2">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="primary3">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="primary4">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="primary5">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="primary6">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="primary7">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
            </ul>
            <ul class="colorsStyleguide secondary">
                <h4>Secondary Colors</h4>
                <li class="secondary1">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="secondary2">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="secondary3">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="secondary4">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="secondary5">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
            </ul>
            <ul class="colorsStyleguide accents">
                <h4>Accent Colors</h4>
                <li class="accent1">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="accent2">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
                <li class="accent3">
                    <div class="colorName"></div>
                    <div class="color"></div>
                    <div class="colorHex"></div>
                </li>
            </ul>
        </div>
    </div>

    <div class="row">
        <h2>02 Typography </h2>
        <hr>
        <div class="col-md-3">
            <h4>Font Family &amp; Styles:</h4>
            <hr>
            <div class="textEx">Roboto </div>
            <div class="textEx light">Roboto Light</div>
            <div class="textEx medium">Roboto Medium </div>
            <div class="textEx condensed">Roboto Condensed</div>
            <div class="textEx italic">Roboto Italic</div>
            <div class="textEx bold">Roboto Bold</div>
        </div>
        <div class="col-md-3">
            <h4>Body &amp; Lists:</h4>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed urna sed neque blandit gravida vitae bibendum dictum, nisl nisi.</p>

            <p><span class="bold">Bold</span> <span class="italic">Italic</span> <a href="#">Hyperlink</a></p>

            <ul>
                <li>Unordered list</li>
                <li>Unordered list</li>
            </ul>
            <ol>
                <li>Ordered list</li>
                <li>Ordered list</li>
            </ol>
        </div>
        <div class="col-md-6">
            <h4>Headings</h4>
            <hr>
            <h1>h1. Bootstrap heading</h1>
            <h2>h2. Bootstrap heading</h2>
            <h3>h3. Bootstrap heading</h3>
            <h4>h4. Bootstrap heading</h4>
            <h5>h5. Bootstrap heading</h5>
            <h6>h6. Bootstrap heading</h6>
        </div>
    </div>

    <div class="row">
        <h2>03 Buttons &amp; Links</h2>
        <hr>
        <div class="col-md-4">
            <div class="col-md-4">
                <div class="primary1-button">Button</div>
                <div class="primary2-button">Button</div>
                <div class="primary3-button">Button</div>
            </div>
            <div class="col-md-4">
                <div class="primary5-button">Button</div>
                <div class="primary6-button">Button</div>
                <div class="primary7-button">Button</div>
            </div>
            <div class="col-md-4">
                <div class="accent1-button">Button</div>
                <div class="accent2-button">Button</div>
                <div class="accent3-button">Button</div>
            </div>
        </div>

        <div class="col-md-4">

        </div>

    </div>

    <div class="row">
        <h2>04 Forms</h2>
        <hr>
        <div class="col-md-4">
          <h2>Input Fields</h2>
          <hr >

            <div class="well">
              <div class="disabled field col-md-12">
                <input type="text" value="Disabled" disabled>
              </div>
              <div class="plain field col-md-12">
                <input type="text" value="Plain Input">
              </div>
              <div class="error field col-md-12">
                <input type="text" class="error" value="Error Input">
              </div>
              <div class="success field col-md-12">
                <input type="text" class="success" value="Success Input">
              </div>
              <div class="icon field col-md-12">
                <input type="text" value="Input w/ Icon">
              </div>
              <div class="withButton field col-md-12 ">
                <input type="text" value="Input w/ icon and button">
                <div class="button">Click</div>
              </div>
            </div>

        </div>

        <div class="col-md-3">

          <h2>Form Formatting</h2>
          <hr >
<div class="formRow">
          <label>Date of Birth</label>
          <div class="col-xs-5 field">
            <drop-down :options="months"></drop-down>
          </div>
          <div class="col-xs-3 disabled field">
            <input type="text" placeholder="Day" disabled>
          </div>
          <div class="col-xs-4 field">
            <input type="text" placeholder="Year">
          </div>
</div>
<div class="formRow">
          <label>Country</label>
          <div class="col-md-12 field">
            <drop-down :options="countries"></drop-down>
          </div>
        </div>
</div>

<div class="col-md-3">
        <h2>Checkboxes</h2>
        <hr >
        <div class="col-md-3">
          <div class="checkboxOne">
	          <input type="checkbox" value="None" id="checkboxOne" name="check" />
	          <label for="checkboxOne"></label>
          </div>
        </div>

        <div class="col-md-3">
          <div class="toggleSwitch">
            <input type="checkbox" value="None" id="toggleSwitchOne" name="check" />
            <div class="toggleSwitchWrap">
	             <label for="toggleSwitchOne"></label>
            </div>
          </div>
        </div>


</div>

    </div>


    <div class="row">


        <div class="col-md-8">
            <h2>05 Tables</h2>
            <hr>

            <div class="table">
              <div class="titleBar">
                <h2>Leads List</h2>
              </div>
              <div class="headings col-md-12 hide-md">
                <div class="col-md-2 no-pad primaryInfo">
                  <div class="col-xs-3">
                    <div class="checkboxOne">
            	         <input type="checkbox" value="None" id="checkbox1" name="check" />
            	          <label for="checkbox1"></label>
                      </div>
                  </div>
                  <div class="col-xs-9">
                    Name
                  </div>
                </div>
                <div class="col-md-10 secondaryInfo no-pad hide-md">
                  <div class="col-md-3">
                    Email Address
                  </div>
                  <div class="col-md-3">
                    Street Address
                  </div>
                  <div class="col-md-2">
                    City
                  </div>
                  <div class="col-md-1">
                    State
                  </div>
                  <div class="col-md-1">
                    Zip
                  </div>
                  <div class="col-md-2">
                      Phone Number
                  </div>
                </div>
              </div>
              <div class="tRows">
                <div class="tRow col-md-12">
                  <div class="col-md-2 no-pad primaryInfo">
                    <div class="col-xs-3">
                      <div class="checkboxOne">
                        <input type="checkbox" value="None" id="checkbox2" name="check" />
                         <label for="checkbox2"></label>
                        </div>
                    </div>
                    <div class="col-xs-9">
                      Carl Grimes
                    </div>
                  </div>
                  <div class="col-md-10 secondaryInfo no-pad hide-md">
                    <div class="col-md-3">
                      1eyedcarl@walking.com
                    </div>
                    <div class="col-md-3">
                      123 Zombie Lane
                    </div>
                    <div class="col-md-2">
                      Columbus
                    </div>
                    <div class="col-md-1">
                      Georgia
                    </div>
                    <div class="col-md-1">
                      30012
                    </div>
                    <div class="col-md-2">
                      	(555) 222-2222
                    </div>
                  </div>
                </div>

                <div class="tRow col-md-12">
                  <div class="col-md-2 no-pad primaryInfo">
                    <div class="col-xs-3">
                      <div class="checkboxOne">
                        <input type="checkbox" value="None" id="checkbox3" name="check" />
                         <label for="checkbox3"></label>
                        </div>
                    </div>
                    <div class="col-xs-9">
                      Carl Grimes
                    </div>
                  </div>
                  <div class="col-md-10 secondaryInfo no-pad hide-md">
                    <div class="col-md-3">
                      1eyedcarl@walking.com
                    </div>
                    <div class="col-md-3">
                      123 Zombie Lane
                    </div>
                    <div class="col-md-2">
                      Columbus
                    </div>
                    <div class="col-md-1">
                      Georgia
                    </div>
                    <div class="col-md-1">
                      30012
                    </div>
                    <div class="col-md-2">
                      	(555) 222-2222
                    </div>
                  </div>
                </div>

                <div class="tRow col-md-12">
                  <div class="col-md-2 no-pad primaryInfo">
                    <div class="col-xs-3">
                      <div class="checkboxOne">
                        <input type="checkbox" value="None" id="checkbox4" name="check" />
                         <label for="checkbox4"></label>
                        </div>
                    </div>
                    <div class="col-xs-9">
                      Carl Grimes
                    </div>
                  </div>
                  <div class="col-md-10 secondaryInfo no-pad hide-md">
                    <div class="col-md-3">
                      1eyedcarl@walking.com
                    </div>
                    <div class="col-md-3">
                      123 Zombie Lane
                    </div>
                    <div class="col-md-2">
                      Columbus
                    </div>
                    <div class="col-md-1">
                      Georgia
                    </div>
                    <div class="col-md-1">
                      30012
                    </div>
                    <div class="col-md-2">
                      	(555) 222-2222
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
        <div class="col-md-4">
            <h2>06 Alerts</h2>
            <hr>

            <div class="alert">
                <div class="col-xs-10">
                    <p>Information displayed to user. LorLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                    <div class="close"></div>
            </div>


            <div class="alert note">
              <div class="col-xs-10">
                  <p><span class="bold">Note!</span> Information displayed to user. LorLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
                  <div class="close"></div>
            </div>


            <div class="alert error">
              <div class="col-xs-10">
                  <p><span class="bold">Error!</span> Information displayed to user. LorLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
                  <div class="close"></div>
            </div>


            <div class="alert warning">
              <div class="col-xs-10">
                  <p><span class="bold">Warning!</span> Information displayed to user. LorLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
                  <div class="close"></div>
            </div>


            <div class="alert success">
              <div class="col-xs-10">
                  <p><span class="bold">Success!</span> Information displayed to user. LorLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
                  <div class="close"></div>
            </div>

        </div>

    </div>


</div>

</template>
