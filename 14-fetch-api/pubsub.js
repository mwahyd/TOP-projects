export default (function pubsub() {
  const events = {};

  function subscribe(evName, func) {
    // assign it to itself only if it exists or create empty []
    events[evName] = events[evName] || [];
    events[evName].push(func);
  }

  function unsubscribe(evName, func) {
    if (events[evName]) {
      events[evName] = events[evName].filter((fn) => fn !== func);
    }
  }

  function publish(evName, data) {
    if (events[evName]) {
      events[evName].forEach((func) => func(data));
    }
  }

  return { subscribe, unsubscribe, publish };
})();
