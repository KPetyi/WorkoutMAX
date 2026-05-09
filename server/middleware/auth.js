const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'Nincs token, a hozzáférés megtagadva!' });
    }

    try {
        const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        // Dekódoljuk a tokent
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // FONTOS: Mivel a te tokenedben csak "id" van, az egészet átadjuk!
        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Érvénytelen token!' });
    }
};