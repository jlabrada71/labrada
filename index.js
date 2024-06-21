export const measure = (fun, { measureName = 'measureName', startMark = 'start', endMark = 'end', collector = console.log, measurer = performance }) => {
    return (...args) => {
        try {
            measurer.mark(startMark);
            const result = fun.apply(null, args);
            return result;
        } finally {
            measurer.mark(endMark);
            const measure = measurer.measure(measureName, startMark, endMark);
            collector(measure);
        }
    }
}

export const measureAsync = (fun, { measureName = 'measureName', startMark = 'start', endMark = 'end', collector = console.log, measurer = performance }) => {
    return async (...args) => {
        try {
            measurer.mark(startMark);
            const result = await fun.apply(null, args);
            return result;
        } finally {
            measurer.mark(endMark);
            const measure = measurer.measure(measureName, startMark, endMark);
            collector(measure);
        }
    }
}