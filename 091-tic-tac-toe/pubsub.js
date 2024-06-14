export const pubsub = (function () {
  const events = {};

  function subscribe(evName, func) {
    events[evName] = events[evName] || [];
    events[evName].push(func);
  }

  function publish(evName, data) {
    if (!events[evName]) return;
    events[evName].forEach((func) => {
      func(data);
    });
  }

  function unsubscribe(evName, func) {
    if (events[evName]) {
      events[evName] = events[evName].filter((fn) => fn !== func);
    }
  }

  return { subscribe, publish, unsubscribe };
})();
