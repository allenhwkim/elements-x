function cumulativeOffset(element: HTMLElement): {x:number, y:number} {
  let y = 0, x = 0;
  do {
    y += element.offsetTop  || 0;
    x += element.offsetLeft || 0;
    element = element.offsetParent as HTMLElement;
  } while(element);

  return {x, y};
};

export function getDistance(a: [number, number], b: [number, number]): number {
  return Math.sqrt(
    Math.pow( (a[0] - b[0]) ,2) +
    Math.pow( (a[1] - b[1]) ,2)
  );
};

export function mouseEventToDeg(event: MouseEvent, box: HTMLElement): number {
  const offset = cumulativeOffset(box);
  const [centerX, centerY] = [
    offset.x + box.offsetWidth / 2, 
    offset.y + box.offsetHeight / 2
  ];

  const atan2 = Math.atan2(
    event.pageX - centerX, 
    (event.pageY - centerY) * -1
  );
  const deg = atan2 * (180 / Math.PI );  
  return deg;
}

export function degToTime(deg: number): [number, number] {
  const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
  const hour = Math.floor(deg2 / 30);  // 1 hour = 30 deg.
  const min = (Math.floor(deg2) % 30) * 2;

  return [hour, min];
}

export function degToMin(deg: number): number {
  const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
  return Math.floor(deg2 / 6);
}
