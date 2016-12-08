(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const INNER_CIRCLE_RADIUSE = 170;
  const OUTER_CIRCLE_RADIUSE = 200;
  const TICK_WIDTH = 5;

  function drawCenteroid() {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
    ctx.fillStyle = 'rgba(80, 190, 240, .6)';

    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2, false);

    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }

  function drawRingOuerCircle() {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = 'rgba(0, 0, 0, .1)';

    ctx.arc(canvas.width / 2, canvas.height / 2, INNER_CIRCLE_RADIUSE, 0, Math.PI * 2, true);

    ctx.stroke();

    ctx.restore();
  }

  function drawRing() {
    drawRingOuerCircle();
    ctx.save();

    ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillStyle = 'rgba(100, 140, 230, .1)';

    ctx.arc(canvas.width / 2, canvas.height / 2, OUTER_CIRCLE_RADIUSE, 0, Math.PI * 2, false);

    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }

  function drawAnnotations() {
    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 230, .9)';
    ctx.font = '12px Helvetica';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
      ctx.beginPath();
      ctx.fillText(
        ((angle * 180) / Math.PI).toFixed(0),
        (canvas.width / 2) + (Math.cos(angle) * (INNER_CIRCLE_RADIUSE - (TICK_WIDTH * 2))),
        (canvas.width / 2) - (Math.sin(angle) * (INNER_CIRCLE_RADIUSE - (TICK_WIDTH * 2))),
      );
    }

    ctx.restore();
  }

  function drawTick(angle) {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = 'rgba(100, 140, 230, .7)';

    ctx.moveTo(
      (canvas.width / 2) + (Math.cos(angle) * (INNER_CIRCLE_RADIUSE)),
      (canvas.height / 2) + (Math.sin(angle) * (INNER_CIRCLE_RADIUSE)),
    );
    ctx.lineTo(
      (canvas.width / 2) + (Math.cos(angle) * ((INNER_CIRCLE_RADIUSE) - TICK_WIDTH)),
      (canvas.height / 2) + (Math.sin(angle) * ((INNER_CIRCLE_RADIUSE) - TICK_WIDTH)),
    );

    ctx.stroke();

    ctx.restore();
  }

  function drawTicks() {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 36) {
      drawTick(angle);
    }
  }

  function drawCenteroidGuidewire(angle) {
    const radian = (angle * Math.PI) / 180;
    const endpos = {
      x: (canvas.width / 2) + (Math.cos(radian) * OUTER_CIRCLE_RADIUSE),
      y: (canvas.height / 2) - (Math.sin(radian) * OUTER_CIRCLE_RADIUSE),
    };

    // line
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = 'red';

    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(endpos.x, endpos.y);

    ctx.stroke();
    ctx.restore();

    // circle
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
    ctx.fillStyle = 'orange';

    ctx.arc(endpos.x, endpos.y, 5, 0, Math.PI * 2);

    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }

  function drawDial() {
    drawCenteroid();
    drawRing();
    drawAnnotations();
    drawTicks();
    drawCenteroidGuidewire(45);
  }

  drawDial();
})();
