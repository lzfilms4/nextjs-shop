import { prisma } from "@/prisma/prisma-client"
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get("cartToken")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Cart token not found" },
        { status: 404 }
      )
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      )
    }

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.log("[CART PATCH] Something went wrong", error)
    return NextResponse.json(
      { message: "[CART PATCH] Something went wrong" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const token = req.cookies.get("cartToken")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Cart token not found" },
        { status: 404 }
      )
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.log("[CART DELETE] Something went wrong", error)
  }
}
