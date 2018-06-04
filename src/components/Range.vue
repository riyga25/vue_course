<template>
  <div>
    <div class="range-info">Сколько: {{ fromKnobValue }}% - {{ toKnobValue }}% стипендии </div>

    <div class="range">
      <div class="range__bar" ref="rangeBar">
        <div class="range__bg">
          <div class="range__bg__inner"></div>
        </div>
        <div class="range__operation">
          <div class="range__section" ref="section" :style="{width: sectionWidth + '%', left: sectionPosition + '%'}"></div>
          <div class="range__point range__point_left" :style="{left: fromKnobPosition + '%'}">
            <div class="range__knob" ref="knobFrom"></div>
          </div>
          <div class="range__point range__point_right" :style="{left: toKnobPosition + '%'}">
            <div class="range__knob" ref="knobTo"></div>
          </div>
        </div>
      </div>
      <div class="drag-cover" ref="dragCover"></div>
    </div>
  </div>
</template>

<script>
  // честно стырено с codepen :)
  function getClientX (e) {
    let clientX = e.clientX;
    if (e.type === 'touchmove' || e.type === 'touchstart') {
      clientX = e.changedTouches[0].clientX;
    }
    return +clientX
  }

  let dragCover = null;
  let rangeBar = null;

    export default {
        name: "Range",
        data () {
          return {
            rangeMin: 0,
            rangeMax: 100,
            rangeBarWidth: 0,
            fromKnobPosition: Number,
            toKnobPosition: Number,
            mouseDownClientX: 0,
            mouseDownFromPosition: 0,
            mouseDownToPosition: 0,
            mouseDownFromToDiff: 0,
            mouseDownType: '',
            mouseMoveVal: 0,
            mouseMoveProportion: 0,
            mouseDragMoving: false
          }
        },
        computed: {
          sectionWidth () {
            return this.toKnobPosition - this.fromKnobPosition
          },
          sectionPosition () {
            return this.fromKnobPosition
          },
          rangeValueOneProp () {
            return (this.rangeMax - this.rangeMin)  / 100
          },
          fromKnobValue () {
            var rangeFrom = Math.ceil(this.fromKnobPosition * this.rangeValueOneProp) + +this.rangeMin;
            this.fromKnobPosition = rangeFrom;
            this.$store.commit('rangeMinUpdate',{count: this.fromKnobPosition});
            return rangeFrom;
          },
          toKnobValue () {
            var rangeTo = Math.ceil(this.toKnobPosition * this.rangeValueOneProp) + +this.rangeMin;
            this.toKnobPosition = rangeTo;
            this.$store.commit('rangeMaxUpdate',{count: this.toKnobPosition});
            return rangeTo;
          }
        },
        beforeMount(){
          this.fromKnobPosition = this.$store.state.filters.rangeMin;
          this.toKnobPosition = this.$store.state.filters.rangeMax;
        },
        mounted () {
          this.$nextTick(() => {
            const knobFrom = this.$refs.knobFrom;
            const knobTo = this.$refs.knobTo;
            const section = this.$refs.section;

            rangeBar = this.$refs.rangeBar;
            dragCover = this.$refs.dragCover;

            this.rangeBarWidth = rangeBar.clientWidth;


            // add listener
            window.addEventListener('resize', this.onWindowResize);

            knobFrom.addEventListener('mousedown', (e) => { this.onMouseDown(e, 'fromKnob') });
            knobFrom.addEventListener('touchstart', (e) => { this.onMouseDown(e, 'fromKnob') });

            knobTo.addEventListener('mousedown', (e) => { this.onMouseDown(e, 'toKnob') });
            knobTo.addEventListener('touchstart', (e) => { this.onMouseDown(e, 'toKnob') });

            section.addEventListener('mousedown', (e) => { this.onMouseDown(e, 'section') });
            section.addEventListener('touchstart', (e) => { this.onMouseDown(e, 'section') });

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('touchmove', this.onMouseMove);

            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('touchend', this.onMouseUp);
          })
        },
        methods: {
          onMouseDown (e, type) {
            e.preventDefault();

            this.mouseDownClientX = getClientX(e);
            this.mouseDownFromPosition = this.fromKnobPosition;
            this.mouseDownToPosition = this.toKnobPosition;
            this.mouseDownFromToDiff = this.mouseDownToPosition - this.mouseDownFromPosition;
            this.mouseDownType = type
          },
          onMouseUp (e) {
            e.preventDefault();
            if (this.mouseDownClientX !== 0) {
              this.mouseDownClientX = 0;
              this.mouseDownFromPosition = 0;
              this.mouseDownToPosition = 0;
              this.mouseDownFromToDiff = 0;
              this.mouseDownType = '';
              this.mouseMoveVal = 0;
              this.mouseMoveProportion = 0;
              this.mouseDragMoving = false;
              document.body.style.cursor = '';
              dragCover.style.display = 'none'
            }
          },
          onMouseMove (e) {
            e.preventDefault();

            if (this.mouseDownClientX !== 0) {
              window.getSelection().removeAllRanges();
              this.mouseMoveVal = -(this.mouseDownClientX - getClientX(e));
              this.mouseMoveProportion = this.mouseMoveVal / this.rangeBarWidth * 100;
              switch (this.mouseDownType) {
                case 'fromKnob':
                case 'toKnob':
                  document.body.style.cursor = 'col-resize';
                  dragCover.style.display = 'block';
                  if (!this.mouseDragMoving && this.fromKnobValue === this.toKnobValue) {
                    if (this.mouseMoveVal < 0) {
                      this.mouseDownType = 'fromKnob'
                    }
                  }
                  this.onMouseMoveKnob(e);
                  break;
                case 'section':
                  document.body.style.cursor = 'ew-resize';
                  dragCover.style.display = 'block';
              }
              if (this.mouseMoveVal !== 0) {
                this.mouseDragMoving = true
              }
            }
          },
          onMouseMoveKnob (e) {
            let val = 0;
            switch (this.mouseDownType) {
              case 'fromKnob':
                val = this.mouseDownFromPosition + this.mouseMoveProportion;
                this.fromKnobPosition = val <= 0 ? 0 : val >= this.toKnobPosition ? this.toKnobPosition : val;
                break;
              case 'toKnob':
                val = this.mouseDownToPosition + this.mouseMoveProportion;
                this.toKnobPosition = val <= this.fromKnobPosition ? this.fromKnobPosition : val >= 100 ? 100 : val;
                break;
            }
          },
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/sass/variables";

  .range {
    position: relative;

    &__bg {
      height: 8px;
      position: absolute;
      padding: 1px;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;

      &__inner {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
      }
    }
    &__operation {
      left: 0;
      top: 0;
      height: 24px;
      position: relative;
    }
    &__section {
      height: 8px;
      top: 1px;
      position: absolute;
      background: $blue-dark;
      margin-left: 2px;
    }
    &__point {
      top: -7px;
      width: 8px;
      height: 24px;
      position: absolute;

      &_right{
        transform: translateX(-50%);
      }
    }
    &__knob {
      width: 100%;
      height: 100%;
      background: $blue;
      cursor: col-resize;
    }
  }
  .range-info{
    margin-bottom: 20px;
    font-size: 14px;
    color: $gray;
  }
</style>
