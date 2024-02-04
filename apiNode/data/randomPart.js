const randomPart =()=>{ Math.random().toString(36).substring(2, 8).toUpperCase();
              const datePart = new Date().toISOString().replace(/[-:.]/g, '');
              const final = `${datePart}-${randomPart}`
                return final;
            }
console.log(randomPart())