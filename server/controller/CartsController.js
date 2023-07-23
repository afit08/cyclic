const allCart = async (req, res) => {
    try {
        const result = await req.context.models.carts.findAll({
            include: [
                {
                    model: req.context.models.products,
                    as: "cart_prod",
                    attributes: [
                        "prod_name",
                        "prod_image",
                        "prod_price"
                    ]
                }
            ]
        });

        const coba = [];
        for (let index = 0; index < result.length; index++) {
            const count = result[index].cart_prod.prod_price * result[index].cart_qty;
            const data = {
                total: count
            }
            coba.push(data);
        }
        const sum = coba.reduce((acc, current) => acc + current.total, 0);

        const results = { result, sum }
        // console.log(results);

        return res.status(200).json(({
            message: "Show All Carts",
            data: results
        }))
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

const addCart = async (req, res) => {
    const { cart_qty,cart_prod_id } = req.body;
    try {
        const result = await req.context.models.carts.create({
            cart_qty: cart_qty,
            cart_prod_id: cart_prod_id,
            cart_user_id: req.user.user_id,
            cart_status: "unpayment"
        });

        return res.status(200).json({
            message: "Add Cart",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const postToPayment = async (req, res) => {
    const { fopa_cart_id, fopa_payment_id } = req.body;
    try {
        const result = await req.context.models.form_payment.create({
            fopa_user_id: req.user.user_id,
            fopa_cart_id: fopa_cart_id,
            fopa_payment_id: fopa_payment_id
        });

        return res.status(200).json({
            message: "Creating Payment",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const showPayment = async (req, res) => {
    try {
        const result = await req.context.models.form_payment.findAll({
            include: [
                {
                    model: req.context.models.users,
                    as: "fopa_user",
                    attributes: [
                        "user_id",
                        "user_name",
                        "user_handphone",
                        "user_address"
                    ],
                    include: [
                        {
                            model: req.context.models.carts,
                            as: "carts",
                            attributes: [
                                "cart_id",
                                "cart_qty",
                                "cart_status",
                                "cart_prod_id"
                            ],
                            include: [
                                {
                                    model: req.context.models.products,
                                    as: "cart_prod",
                                    attributes: [
                                        "prod_id",
                                        "prod_name",
                                        "prod_image",
                                        "prod_price"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const results = [];
        for (let index = 0; index < result.length; index++) {
            const carts = result[index].fopa_user.carts

            const cart = [];
            for (let a = 0; a < carts.length; a++) {
                const data = {
                    cart_id: carts[a].cart_id,
                    cart_qty: carts[a].cart_qty,
                    cart_status: carts[a].cart_status,
                    prod_id: carts[a].cart_prod.prod_id,
                    prod_name: carts[a].cart_prod.prod_name,
                    prod_image: carts[a].cart_prod.prod_image,
                    prod_price: carts[a].cart_prod.prod_price,
                    amount: carts[a].cart_qty * carts[a].cart_prod.prod_price
                }   
                cart.push(data);
            }

            const sum = cart.reduce((acc, current) => acc + current.amount, 0);
            // console.log(sum);
            const data = {
                user_id: result[index].fopa_user.user_id,
                user_name: result[index].fopa_user.user_name,
                user_handphone: result[index].fopa_user.user_handphone,
                user_address: result[index].fopa_user.user_address,
                cart: [...cart],
                subtotal: sum
            }

            results.push(data)
        }

        return res.status(200).json({
            message: "Show Form Payment",
            data: results
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export default {
    allCart,
    addCart,
    postToPayment,
    showPayment
}